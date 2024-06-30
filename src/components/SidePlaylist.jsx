import React from 'react'
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API;

export default function SidePlaylist({playlist}) {
  const navigate = useNavigate();

    let imgUrl = API + 'img/' + playlist.image;

    const handleClick = (e) => {
      navigate('/playlist/' + playlist.playlistId);
    }

  return (
    <div className=' w-[90%] flex flex-row justify-between items-center hover:cursor-pointer hover:bg-gray-800 p-1 gap-2 mx-auto rounded-md' onClick={handleClick}>
        <img className=' w-[60px] rounded-lg' src={imgUrl} alt="sideImg" />
        <div className=' flex-1'>
            <h1 className='text-gray-300 text-md'>{playlist.name}</h1>
            <h2 className='text-gray-500 text-sm'>{playlist.description}</h2>
        </div>
    </div>
  )
}
