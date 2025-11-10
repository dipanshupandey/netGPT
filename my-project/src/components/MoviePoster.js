import React from 'react'
import MovieClicked from './MovieClicked';
import { useDispatch } from 'react-redux';
import { addSelectedMovie } from '../utils/browseSlice';
const MoviePoster = ({movie}) => {
  const dispatch=useDispatch();
  return (
    <>
        <img className='w-[170px] h-[230px] object-cover transition-transform duration-300 hover:scale-110 hover:brightness-110 cursor-pointer' src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt=""  onClick={()=>dispatch(addSelectedMovie(movie))}/>
        
    </>
  )
}

export default MoviePoster