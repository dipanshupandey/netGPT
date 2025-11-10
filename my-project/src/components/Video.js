import React, { useEffect, useState } from 'react';
import { options } from '../utils/constants';
const Video = ({ movieId }) => {
  const [trailer, setTrailer] = useState(null);
  const getVideo = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );
      const data = await res.json();

      // Filter for trailer type
      const trailers = data?.results?.filter((vid) => vid.type === 'Trailer');
      const selectedTrailer = trailers?.length ? trailers[0] : data?.results?.[0];
      setTrailer(selectedTrailer);
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  useEffect(() => {
    if (movieId) getVideo();
  }, [movieId]);

  return (
    <div className="relative w-full h-[50vh] sm:h-[70vh] md:h-screen overflow-hidden bg-black">
      {/* 🔹 YouTube trailer */}
      {trailer?.key ? (
        <iframe
          className="absolute top-0 left-0 w-full h-full object-cover scale-125 md:scale-150 pointer-events-none transition-transform duration-500"
          src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${trailer?.key}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      ) : (
        // 🔹 Fallback background for small screens or slow connections
        <div className="flex items-center justify-center h-full text-white text-sm sm:text-base">
          Loading trailer...
        </div>
      )}

      {/* 🔹 Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
    </div>
  );
};

export default Video;
