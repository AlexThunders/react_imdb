import React,{useContext} from 'react';
import Movie from './Movie';
import {MainContext} from './contexts/MainContext';
import {v4 as uuidv4} from 'uuid';
import MyListOptions from './MyListOptions';

const MyMovies = () => {
  const {myList} = useContext(MainContext);

  const scroll2movie = (option) => {
    console.log(option);
  }
  
  return (
    <div>
      {myList.length > 0 && <MyListOptions myList={myList && myList} scroll2movie={scroll2movie}/>}
      <div className="searchResults">
        {
          myList.length === 0 ? 
          <h4>You can add here your favorite movies</h4> :
          myList.map(movie => <Movie key={uuidv4()} movie={movie}/>)
        }
      </div>
    </div>
  );
}
 
export default MyMovies;
