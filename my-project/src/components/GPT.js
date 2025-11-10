import React from 'react';
import GPTSearch from './GPTSearch';
import GPTResults from './GPTResults';
const GPT = () => {
  return (
    <div className='w-full  h-screen flex flex-col justify-center items-center '>
      
      <img className="fixed -z-10  h-full w-full object-cover" src="/background.jpg" alt="" />
      <GPTSearch/>
      <GPTResults/>

    </div>
  )
}

export default GPT