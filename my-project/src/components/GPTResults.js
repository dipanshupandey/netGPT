import React from 'react'
import { useSelector } from 'react-redux'
import Searched_movie from './Searched_movie'

const GPTResults = () => {
  const searchResults = useSelector((store) => store?.gpt?.gptResults);
  // console.log("->", searchResults);

  if (!searchResults || searchResults.length === 0) return null;
  
  return (
    <div className="w-full flex flex-col items-center gap-4 mt-8 px-3 sm:px-6 overflow-y-auto scrollbar-hide">
      {searchResults.map((item, index) => (
        <div 
          key={index} 
          className="bg-black/90 w-full sm:w-10/12 md:w-8/12 lg:w-7/12 rounded-lg shadow-lg p-3 sm:p-4 transition-transform hover:scale-[1.01] duration-200"
        >
          <Searched_movie nowPlaying={item} />
        </div>
      ))}
    </div>
  )
}

export default GPTResults;
