import React, {useContext,useEffect} from 'react';
import { MainContext } from './contexts/MainContext';
import {v4 as uuidv4} from 'uuid';


const Movie = React.forwardRef((props,movieref) => {
  const {img, changeFromBackCard, toggleAddOrDelete} = useContext(MainContext);
  const {movie} = props;
  const handleClick = (inp) => {
    changeFromBackCard(inp);
  }

  return (
    <div>
      <div className="movie" movieref={movieref}>

        <div className="frontCard">
          <img 
            src={movie.poster_path ?
              (img+movie.poster_path):
              //profile is for cases with celebrities
              (img+movie.profile_path)}
            alt={movie.title ?
              movie.title :
              (movie.orriginal_name || movie.name)}
          />
          <h5>
            {movie.vote_average ? `Rate: ${movie.vote_average}` : 
            //movie name is for celebrities,because there is no vote_average
            movie.name}
          </h5>
        </div>

        <div className="backCard" >
          <div className="addToMyListBtn" onClick={() => 
            toggleAddOrDelete(
              movie.title || movie.original_name || movie.name,
              movie.id,
              movie.popularity,
              movie.addMark,
              ((movie.title && movie.poster_path) ? 'movie' : (movie.gender ? 'person' : 'tv')))
            }>
            {movie.addMark ? <i className="fas fa-plus"></i> : <i className="fas fa-trash-alt"></i>}
          </div>
          <img 
              className="backPic"
              src={movie.backdrop_path ?
                (img+movie.backdrop_path):
                (img+movie.profile_path)}
              alt={movie.title || movie.original_name || movie.name}
            />
          <h4>{movie.title || movie.original_name || movie.name}</h4>
          <p>{movie.overview}</p>
          <h5>{(movie.release_date || movie.first_air_date) ? 'Release: ' : 'Known for '}: {movie.release_date ? movie.release_date : movie.first_air_date}</h5>
          {movie.known_for && movie.known_for.map(m => (
            <span 
              key={uuidv4()} 
              className="knownFor"
              onClick={() => handleClick((m.original_title || m.original_name))
            }>
              {m.original_title || m.original_name}{'; '}<hr></hr>
            </span> 
          ))}
        </div>

      </div>
    </div>
  );
})
 
export default Movie;
