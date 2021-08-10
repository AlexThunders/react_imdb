import React,{useContext,useState} from 'react';
import {MainContext} from './contexts/MainContext';
import {v4 as uuidv4} from 'uuid'; 

const AlignButtons = ({alignAZ,alignZA,sortedAZ,sortedZA}) => {
  const handleStyleAZ = () => {
    if(sortedAZ) {
      return {backgroundColor: 'green',color:'white'}
    }
  }
  const handleStyleZA = () => {
    if(sortedZA) {
      return {backgroundColor: 'green',color:'white'}
    }
  }
  return(
    <>
      <i className="fas fa-sort-alpha-down" onClick={alignAZ} style={handleStyleAZ()}></i>
      <i className="fas fa-sort-alpha-down-alt" onClick={alignZA} style={handleStyleZA()}></i>
    </>
  )
}



const MyListOptions = ({myList,scroll2movie,alignAZ,alignZA,sortedAZ,sortedZA}) => {
  const {clearList} = useContext(MainContext);
  const [val,setVal] = useState('All my movies');

  const handleChange = (e) => {
    scroll2movie(e.target.value);
    setVal(e.target.value);
  }

  return (
    <div className="options">
      {myList.some(obj => obj.media_type == 'person') && 
        <AlignButtons 
          alignAZ={alignAZ}
          alignZA={alignZA}
          sortedAZ={sortedAZ}
          sortedZA={sortedZA}
      />}
      <select className="select" value={val} onChange={handleChange}>
        <option>All</option>
        {myList !== undefined && myList.map(item => (
          <option key={uuidv4()} value={item.title}>
            {item.title ? item.title : (item.orriginal_name || item.name)}
          </option>
        ))}
      </select>
      <h5 onClick={() => scroll2movie('All')}>My favourites</h5>
      <button className="clearBtn" onClick={() => clearList(myList)}>Clear</button>
    </div>
  )
} 

export default MyListOptions;