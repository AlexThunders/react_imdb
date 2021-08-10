import React,{useContext, useEffect, useState} from 'react';
import Movie from './Movie';
import {MainContext} from './contexts/MainContext';
import {v4 as uuidv4} from 'uuid';
import MyListOptions from './MyListOptions';

const MyMovies = () => {
  const {myList} = useContext(MainContext);
  const [myMovies,setMyMovies] = useState(myList);

  const scroll2movie = (option) => {
    if(option === 'All') {
      setMyMovies(myList);
    } else {
      let selected = myList.filter(movie => movie.title == option);
      setMyMovies(selected);
    }
  }

  const changeMyList = () => {
    setMyMovies(myList);
  }
  useEffect(() => {
    //update component immediately when delete movie from favorites
    changeMyList();
  },[myList])
  
  return (
    <div>
      {myList.length > 0 && <MyListOptions myList={myList && myList} scroll2movie={scroll2movie}/>}
      <div className="searchResults">
        {
          myList.length === 0 ? 
          <h4>You can add here your favorite movies</h4> : 
          myMovies.map(movie => <Movie key={uuidv4()} movie={movie}/>)
        }
      </div>
    </div>
  );
}
 
export default MyMovies;
