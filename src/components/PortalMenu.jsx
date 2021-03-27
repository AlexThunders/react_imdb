import React, {useContext} from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom';
import {MainContext} from './contexts/MainContext';

const PortalMenu = ({closePortal}) => {
  const {changeOption} = useContext(MainContext)
  return ReactDom.createPortal(
    <div className="ddList">
      <Link to="/appsR7/2021/imdb/" onClick={() => {
        changeOption('all')
        closePortal()}}>
          popular movies
      </Link>
      <Link to="/appsR7/2021/imdb/" onClick={() => {
        changeOption('episodes')
        closePortal()}}>
          trending TV shows
      </Link>
      <Link to="/appsR7/2021/imdb/" onClick={() => {
        changeOption('celebs')
        closePortal()}}>
          celebrities
      </Link>
      <Link to="/appsR7/2021/imdb/MyMovies" onClick={closePortal}>My favourite movies</Link>
      <Link to="/appsR7/2021/imdb/MyTVshows" onClick={closePortal}>My favourite TV shows</Link>
      <Link to="/appsR7/2021/imdb/MyCelebs" onClick={closePortal}>My favourite celebrities</Link>
    </div>,
  document.getElementById('portalMenu')
  );
}
 
export default PortalMenu;
