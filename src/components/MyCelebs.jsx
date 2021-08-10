import React,{useContext,useState, useRef, useEffect} from 'react';
import Movie from './Movie';
import {MainContext} from './contexts/MainContext';
import {v4 as uuidv4} from 'uuid';
import MyListOptions from './MyListOptions';

const MyCelebs = () => {
  const {myCelebsList} = useContext(MainContext);
  const [myCelebs,setMyClebs] = useState(myCelebsList);
  const movieref = useRef();
  const [sortedAZ,setSortedAZ] = useState(false);
  const [sortedZA,setSortedZA] = useState(false);

  const scroll2movie = (option) => {
    if(option === 'All') {
      setMyClebs(myCelebsList);
      setSortedAZ(false);
      setSortedZA(false);
    } 
    else {
      let selected = myCelebsList.filter(person => option === person.name);
      setMyClebs(selected);
    }
  }

  const alignAZ = () => {
    myCelebsList.sort((a, b) => a.name.localeCompare(b.name));
    setSortedAZ(true);
    setSortedZA(false);
  }
  const alignZA = () => {
    myCelebsList.sort((a, b) => b.name.localeCompare(a.name));
    setSortedZA(true);
    setSortedAZ(false);
  }
  
  const handleSorting = () => {
    setMyClebs(myCelebsList);
  }

  useEffect(() => {
    handleSorting();
  },[sortedAZ,sortedZA]) 
  
  const changeMyList = () => {
    setMyClebs(myCelebsList);
  }
  useEffect(() => {
    //update component immediately when delete person from favorites
    changeMyList();
  },[myCelebsList])

  return (
    <div>
     
      {myCelebsList.length > 0 && <MyListOptions 
        myList={myCelebsList && myCelebsList}
        scroll2movie={scroll2movie}
        alignAZ={alignAZ}
        alignZA={alignZA}
        sortedAZ={sortedAZ}
        sortedZA={sortedZA}
      />}
      <div className="searchResults">
        {
          myCelebsList.length === 0 ? 
          <h4>You can add here your favorite celebrities</h4> :
          myCelebs.map(person => <Movie key={uuidv4()} movie={person} movieref={movieref}/>)
        }
      </div>
    </div>
  );
}
 
export default MyCelebs;

