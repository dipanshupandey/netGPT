import React from 'react';
import { useSelector } from 'react-redux';
import { ln } from "../utils/constants";

const Heading = ({ movie }) => {
  const lan = useSelector((store) => store?.user?.lan);
  const language = ln[lan];

  return (
    <div className="z-10 absolute bottom-28 sm:bottom-16 md:bottom-20 lg:bottom-24 left-4 sm:left-8 md:left-12 lg:left-16 xl:left-24 w-[90%] sm:w-3/4 md:w-2/3 xl:w-1/2 text-white">
      
      {/* Movie Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 line-clamp-2">
        {movie?.title || language.movie}
      </h1>

      {/* Movie Overview */}
      <p className="text-sm sm:text-base md:text-lg line-clamp-3 md:line-clamp-2 xl:line-clamp-3 mb-4">
        {movie?.overview || language.overview}
      </p>

      {/* Buttons */}
      <div className="flex flex-row gap-2 sm:gap-3">
        <button className="bg-white text-black font-bold text-sm sm:text-base px-3 py-1.5 rounded-md hover:scale-105 transition-transform duration-200">
          ▶︎ {language.play}
        </button>
        <button className="bg-gray-500/70 text-white font-semibold text-sm sm:text-base px-3 py-1.5 rounded-md hover:scale-105 transition-transform duration-200">
          {language.moreInfo}
        </button>
      </div>

    </div>
  );
};

export default Heading;
