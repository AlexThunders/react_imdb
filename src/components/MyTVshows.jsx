import React,{useContext,useState,useEffect} from 'react';
import Movie from './Movie';
import {MainContext} from './contexts/MainContext';
import {v4 as uuidv4} from 'uuid';
import MyListOptions from './MyListOptions';

const MyTVshows = () => {
  const {myTVlist} = useContext(MainContext);
  const [myTV,setMyTV] = useState(myTVlist);

  const scroll2movie = (option) => {
    if(option === 'All') {
      setMyTV(myTVlist);
    } 
    else {
      let selected = myTVlist.filter(person => option === person.name);
      setMyTV(selected);
    }
  }


  const changeMyList = () => {
    setMyTV(myTVlist);
  }
  useEffect(() => {
    //update component immediately when delete tv show from favorites
    changeMyList();
  },[myTVlist])

  return (
    <div>
      {myTVlist.length > 0 && <MyListOptions myList={myTVlist && myTVlist} scroll2movie={scroll2movie}/>}
      <div className="searchResults">
        {
          myTVlist.length === 0 ? 
          <h4>You can add here your favorite movies</h4> :
          myTV.map(tvShow => <Movie key={uuidv4()} movie={tvShow}/>)
        }
      </div>
    </div>
  );
}
 
export default MyTVshows;

