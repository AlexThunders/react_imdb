import React,{useContext} from 'react';
import Movie from './Movie';
import {MainContext} from './contexts/MainContext';
import {v4 as uuidv4} from 'uuid';
import MyListOptions from './MyListOptions';

const MyTVshows = () => {
  const {myTVlist} = useContext(MainContext);
  const scroll2movie = (option) => {
    console.log(option);
  }

  return (
    <div>
      {myTVlist.length > 0 && <MyListOptions myList={myTVlist && myTVlist} scroll2movie={scroll2movie}/>}
      <div className="searchResults">
        {
          myTVlist.length === 0 ? 
          <h4>You can add here your favorite movies</h4> :
          myTVlist.map(tvShow => <Movie key={uuidv4()} movie={tvShow}/>)
        }
      </div>
    </div>
  );
}
 
export default MyTVshows;

