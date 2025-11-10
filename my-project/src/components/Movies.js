import React from 'react';
import {useSelector} from "react-redux";

import MovieRow from './MovieRow';
import { ln } from '../utils/constants';
import MovieClicked from './MovieClicked';
const Movies = () => {
  const nowPlaying=useSelector((state)=>state?.browse?.nowPlaying); 
  const popular = useSelector((state) => state?.browse?.popular); 
  const topRated = useSelector((state) => state?.browse?.topRated); 
  const upComingBollyWood = useSelector((state) => state?.browse?.upComingBollyWood); 
  const disCoverBolllyWood = useSelector((state) => state?.browse?.disCoverBolllyWood); 
  const popularTvShows = useSelector((state) => state?.browse?.popularTvShows); 
  const topRatedTvShows = useSelector((state) => state?.browse?.topRatedTvShows); 
  const popularIndianTvShows = useSelector((state) => state?.browse?.popularIndianTvShows);
  const lan=useSelector((state)=>state?.user?.lan);
  const language=ln[lan];
  const selectedMovie=useSelector((store)=>store.browse.selectedMovie);
  const allSections = [
    { title: language.nowPlaying, data: nowPlaying },
    { title: language.popularMovies, data: popular },
    { title: language.topRatedMovies, data: topRated },
    { title: language.upcomingBollywood, data: upComingBollyWood },
    { title: language.discoverBollywood, data: disCoverBolllyWood },
    { title: language.popularTVShows, data: popularTvShows },
    { title: language.topRatedTVShows, data: topRatedTvShows },
    { title: language.popularIndianTVShows, data: popularIndianTvShows },
  ];
  console.log(nowPlaying,popular)
  return (
    
    <>
      {allSections.map((section, index) => (
        <div
          key={index}
          className={`bg-transparent relative z-30 flex flex-col ${
            index === 0 ? "-mt-32" : ""
          }`}
        >
          <h1 className='text-white text-xl font-bold mb-2'>{section.title}</h1>
          <MovieRow nowPlaying={section.data} />
        </div>
      ))}
      {selectedMovie&&<MovieClicked/>}
    </>
  );
}

export default Movies