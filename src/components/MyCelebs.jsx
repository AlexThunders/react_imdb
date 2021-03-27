import React,{useContext,useState, useRef} from 'react';
import Movie from './Movie';
import {MainContext} from './contexts/MainContext';
import {v4 as uuidv4} from 'uuid';
import MyListOptions from './MyListOptions';

const MyCelebs = () => {
  const {myCelebsList} = useContext(MainContext);
  const [opt,setOpt] = useState(''); 
  const movieref = useRef();

  const scroll2movie = (option) => {
    setOpt(option);
    let newArr = myCelebsList.filter(person => opt === person.name)
        // let movieCoords = movieref.current.getBoundingClientRect();
        // console.log(movieCoords)
    console.log(newArr)
  }

  return (
    <div>
      {myCelebsList.length > 0 && <MyListOptions myList={myCelebsList && myCelebsList} scroll2movie={scroll2movie}/>}
      <div className="searchResults">
        {
          myCelebsList.length === 0 ? 
          <h4>You can add here your favorite celebrities</h4> :
          myCelebsList.map(person => <Movie key={uuidv4()} movie={person} opt={opt} movieref={movieref}/>)
        }
      </div>
    </div>
  );
}
 
export default MyCelebs;

