import React from 'react'
import ResultMovie from './ResultMovie';

const Searched_movie = ({nowPlaying}) => {
    // console.log("?",nowPlaying);
  return (
    <>
    {nowPlaying && nowPlaying.map((item)=><ResultMovie movie={item}/>)}
    </>
  )
}

export default Searched_movie