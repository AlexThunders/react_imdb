import React,{useContext} from 'react';
import {MainContext} from './contexts/MainContext';
import {v4 as uuidv4} from 'uuid'; 

const MyListOptions = ({myList,scroll2movie}) => {
  const {clearList} = useContext(MainContext);

  return (
    <div className="options">
      <select className="select" onChange={e => scroll2movie(e.target.value)}>
        {myList !== undefined && myList.map(item => (
          <option key={uuidv4()}>
            {item.title ? item.title : (item.orriginal_name || item.name)}
          </option>
        ))}
      </select>
      <h5>My favourites</h5>
      <button className="clearBtn" onClick={() => clearList(myList)}>Clear</button>
    </div>
  )
} 

export default MyListOptions;