import React, { useEffect, useState } from 'react';
// ❌ We have removed the insecure 'options' import

const Video = ({ movieId }) => {
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    // We define the async function *inside* useEffect
    // This is a best practice and avoids dependency array issues.
    const getVideo = async () => {
      if (!movieId) return; // Don't fetch if there's no movieId

      try {
        // 1. This is the TMDB path we want to get
        const tmdbPath = `/movie/${movieId}/videos?language=en-US`;
        
        // 2. This is our secure Vercel proxy URL
        const url = `/api/tmdb?path=${encodeURIComponent(tmdbPath)}`;

        // 3. Fetch from the proxy. No 'options' object is needed!
        const res = await fetch(url); 
        const data = await res.json();

        // Filter for trailer type
        const trailers = data?.results?.filter((vid) => vid.type === 'Trailer');
        const selectedTrailer = trailers?.length ? trailers[0] : data?.results?.[0];
        setTrailer(selectedTrailer);

      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    getVideo(); // Call the function

  }, [movieId]); // This effect re-runs only when movieId changes

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
        // 🔹 Fallback
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