import React,{useContext, useState, useEffect} from 'react';
import { MainContext } from './contexts/MainContext';
import {v4 as uuidv4} from 'uuid';
import Movie from './Movie';

const ScrollPage  = () => {
  const {pageNumber, decrementPage, incrementPage, option} = useContext(MainContext);

  const handleCategory = () => {
    if(option === 'all') return 'Movies'
    if(option === 'episodes') return 'TV shows'
    if(option === 'celebs') return 'Celebrities'
  }
  return (
    <div className="pageScroll">
      <i className="fas fa-long-arrow-alt-left leftArrow" onClick={decrementPage}></i>
      <span>{handleCategory()}</span> | <span>Page {pageNumber}</span>
      <i className="fas fa-long-arrow-alt-right rightArrow" onClick={incrementPage}></i>
    </div>
  )
}

const MainPage = () => {
  const {movies} = useContext(MainContext);
  const [arrWithAddBtn, setArrWithAddBtn] = useState([]);

  const upgradeArray = newArr => setArrWithAddBtn(newArr);

  useEffect(() => {
    if(movies.length > 0) {
      const newArr = movies.map(movie => {return {...movie, addMark: true}})
      upgradeArray(newArr)
    }
  },[movies])

  return (
    <div className="mainGrid">
      <ScrollPage />
      <div className="searchResults">
        {arrWithAddBtn.length > 0 && arrWithAddBtn.map(movie => <Movie key={uuidv4()} movie={movie}/>)}
      </div>
      <ScrollPage />
    </div>
  );
}
 
export default MainPage;
