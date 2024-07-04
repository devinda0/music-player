import React, { useState } from 'react'
import SongLine from './SongLine'
import axios from 'axios';

const API = process.env.REACT_APP_API;

const tempSong = {
  image:'1Dka4Owadz5FIFFRpaKVmXFtDZoAM3CJt',
  name: 'song name',
  authors: 'song authors'
}

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API}user/search`,{searchText})
      .then((res) => {
        console.log(res.data.searchResult);
        setSearchResult(res.data.searchResult);
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className=' flex flex-col justify-start items-center w-full px-2 h-full overflow-hidden'>

      <form className=' my-4 mx-3 w-full max-w-[900px] flex flex-row flex-nowrap justify-start items-center gap-0 relative' onSubmit={handleFormSubmit}>
        <button className=' h-10 w-10 rounded-md flex-0 m-auto bg-gray-50 mx-0 absolute' type="submit">
          <svg className='w-9 h-9' xmlns="http://www.w3.org/2000/svg">
            <path className='scale-[0.75] fill-gray-900' d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
          </svg>
        </button>

        <input 
          className=' flex-1 rounded-md h-10 active:border-none bg-gray-50 mx-0 pr-2 pl-11 text-gray-900 text-xl font-bold'
          type="text" 
          name="search" 
          id="search" 
          placeholder='Search'
          value={searchText}
          onChange={(e) => setSearchText((pre) => e.target.value)}
        />
      </form>

      <div className='w-full flex flex-col gap-1 bg-gray-900 py-2 px-3'>

        {
          searchResult.map((value, index) => 
            <SongLine key={index} song={value} />
            )
        }

      </div>
        
    </div>
  )
}
