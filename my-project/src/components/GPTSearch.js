import React, { useState } from 'react'
import useGetMovieRecommendations from '../hooks/useGetMovieRecommendations';
import { ln } from '../utils/constants';
import { useSelector } from 'react-redux';

const GPTSearch = () => {
  const [searchKeywords, setSearchKeyWords] = useState(''); 
  const getMovieRecommendations = useGetMovieRecommendations();
  const lan = useSelector((store) => store?.user?.lan);
  const language = ln[lan];

  return (
    <div className="w-full flex justify-center items-center min-h-[40vh] px-4">
      <form 
        onSubmit={(e) => e.preventDefault()} 
        className="flex flex-col sm:flex-row w-full sm:w-[100px] md:w-1/2 gap-3"
      >
        <input
          type="text"
          placeholder={language.placeHolder}
          className="flex-grow p-3 sm:p-4 bg-black text-white placeholder-gray-400 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-base sm:text-lg"
          onChange={(e) => setSearchKeyWords(e.target.value)}
        />
        <button
          className="bg-[#D9232E] text-white font-semibold rounded-md px-4 py-3 sm:py-4 hover:bg-red-600 transition-all duration-200"
          onClick={() => getMovieRecommendations(searchKeywords)}
        >
          {language.search}
        </button>
      </form>
    </div>
  )
}

export default GPTSearch;
