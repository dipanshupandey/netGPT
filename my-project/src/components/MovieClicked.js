import React, { useEffect } from "react";
import { ln } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { removeSelectedMovie } from "../utils/browseSlice";
import { useNavigate } from "react-router";
const MovieClicked = () => {
  const movie = useSelector((store) => store.browse.selectedMovie);
  const lan = useSelector((store) => store.user.lan);
  const language = ln[lan];
  const dispatch = useDispatch();
  const navigate=useNavigate();

  // Disable background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex justify-center items-center bg-black/90 backdrop-blur-sm p-4 overflow-auto"
      onClick={() => dispatch(removeSelectedMovie())} // close when clicking outside
    >
      <div
        className="relative bg-gray-900 text-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-2xl md:max-w-3xl overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* ❌ Close Button */}
        <button
          onClick={() => dispatch(removeSelectedMovie())}
          className="absolute top-3 right-3 bg-gray-700 hover:bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center text-lg font-bold transition-all z-[1100]"
        >
          ×
        </button>

        {/* 🎬 Poster */}
        <div className="w-full md:w-1/2 flex-shrink-0 ">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-64 sm:h-80 md:h-[450px] object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        </div>

        {/* 🎞 Info */}
        <div className="flex flex-col justify-center p-4 sm:p-6 md:w-1/2 md:space-y-4 space-y-2">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              {movie.title}
            </h1>
            <p className="text-gray-300 text-sm sm:text-base max-h-48 md:max-h-96 overflow-y-auto">
              {movie.overview || "No overview available."}
            </p>
          </div>

          
          <div className="flex items-center justify-between text-sm sm:text-base">
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400 text-xl">⭐</span>
              <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
            </div>
            <p className="text-gray-400">
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : "Unknown Year"}
            </p>
          </div>

          {/* Play button */}
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all w-full md:w-auto text-center"
          onClick={()=>navigate(`/video/${movie.id}`)}>
            {language.play}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieClicked;
