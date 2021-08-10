import React, {useState, useContext, useEffect} from 'react';
import { MainContext } from './contexts/MainContext';
import PortalSearch from './PortalSearch';
import {useHistory} from 'react-router-dom';

export default function Form() {
  const [inp,setInp] = useState('');
  const {searchRequest, changeOption} = useContext(MainContext);
  const [showPortal, setShowPortal] = useState('none');
  const [selectedValue, setSelectedValue] = useState('all');
  const path="/appsR7/2021/imdb";
  let history = useHistory();

  const handleSearch = (e) => {
    if(e.keyCode === 13) {
      searchRequest(inp, selectedValue);
      history.push(path);
      setInp('');
    }
  }
  const handleSearch2 = () => {
    if(window.innerWidth < 600) {
      setShowPortal('block')
      history.push(path);
    }
    if(inp === '') return
    searchRequest(inp, selectedValue);
    setInp('');
  }

  const searchFromPortal = (inp) => {
    searchRequest(inp);
  }
  const closePortal = () => {
    setShowPortal('none')
  }

  useEffect(() => {
    changeOption(selectedValue);
  },[selectedValue]);

  return (
    <>
    <form className="headerForm" onSubmit={e => e.preventDefault()}>

      <input
        autoFocus
        className="searchInp"
        type="text"
        value={inp}
        onChange={e => setInp(e.target.value)}
        placeholder="Search IMDb"
        onKeyDown={handleSearch}
      /> 
      <button type="button" onClick={handleSearch2} className="searchBtn"><i className="fas fa-search"></i></button>
    </form>
    {showPortal == 'block' &&
      <PortalSearch 
        showPortal={showPortal}
        input={(inp !== undefined && inp !== '') && inp} 
        searchFromPortal={searchFromPortal}
        closePortal={closePortal}
      />
    }
    </>
  )
}



