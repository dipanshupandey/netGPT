import React, { useEffect, useState } from 'react';
import Heading from './Heading';
import Video from './Video';
import { useSelector } from 'react-redux';

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const movies = useSelector((store) => store.browse?.nowPlaying);

  useEffect(() => {
    if (movies?.length > 0) {
      setMovie(movies[Math.floor(Math.random() * movies.length)]);
    }
  }, [movies]);

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-screen text-white overflow-hidden">
      
      {/* Background Video */}
      <Video movieId={movie?.id} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"></div>

      {/* Heading Section */}
      <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 px-4 sm:px-8 md:px-16 lg:px-24 w-full z-10">
        <Heading movie={movie} />
      </div>
    </div>
  );
};

export default Hero;
