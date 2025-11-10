import React from 'react'
import MoviePoster from './MoviePoster'

const MovieRow = ({ nowPlaying = [] }) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex space-x-3 sm:space-x-4 px-3 sm:px-6 py-2 sm:py-4 items-center">
        {nowPlaying.map((movie) => (
          movie?.poster_path && (
            <div
              key={movie.id}
              className="flex-shrink-0 w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] hover:scale-105 transition-transform duration-200 ease-out"
            >
              <MoviePoster movie={movie} />
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default MovieRow
