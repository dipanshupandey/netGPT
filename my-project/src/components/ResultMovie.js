import React from "react";
import { Star } from "lucide-react"; // lightweight icon from lucide-react

const ResultMovie = ({ movie }) => {
  if (!movie || !movie.poster_path) return null;

  return (
    <div className="flex flex-col md:flex-row bg-zinc-900 rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto my-6 p-4 hover:scale-[1.02] transition-transform duration-300">
      {/* Movie Poster */}
      <div className="w-full md:w-1/3 flex justify-center items-center">
        <img
          className="w-full  h-52 md:h-72 object-cover rounded-xl"
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.title || movie.name || "Movie Poster"}
          loading="lazy"
        />
      </div>

      {/* Movie Details */}
      <div className="flex flex-col justify-between p-4 md:p-6 text-white md:w-2/3">
        <div>
          <h1 className="text-2xl font-semibold mb-2">
            {movie.name || movie.title || "Untitled Movie"}
          </h1>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-4">
            {movie.overview || "No overview available."}
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400 items-center">
          {/* <p>
            <span className="font-medium text-white">Popularity:</span>{" "}
            {movie.popularity?.toFixed(0)}
          </p> */}
          <p>
            <span className="font-medium text-white">Release:</span>{" "}
            {movie.release_date || "N/A"}
          </p>

          {/* ⭐ Rating Section */}
          {movie.vote_average && (
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-medium">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultMovie;
