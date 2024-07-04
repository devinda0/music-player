import React, { useContext, useRef } from 'react'
import PlayerContext from './PlayerContext';
import UserDetails from './UserDetails';

const API = process.env.REACT_APP_API;

export default function SongLine({song}) {
    const imgUrl = API + 'img/' +song.image;
    const playerState = useContext(PlayerContext)
    const moreBtnRef = useRef(null);
    const userDetails = useContext(UserDetails);

    const handleSongClick = (e) => {
        if(moreBtnRef.current && moreBtnRef.current.contains(e.target)) return;
        const player = playerState.playerRef.current;
        playerState.setPlayingSong(song);
        const playAgain = () => {
          player.play();
          playerState.setPlaying(true);
          player.removeEventListener('canplay',playAgain);
        }
        player.addEventListener('canplay',playAgain);
    }

    const handleSongAddPlaylist = (e) => {
        userDetails.setAddingSongId(song.songId);
        userDetails.setIsAddingSong(true);
    }

    return (
        <div className='flex flex-row w-full justify-between items-center gap-2 hover:bg-gray-700 px-1 py-1 rounded' onClick={handleSongClick}>
            <div>
                <img className=' h-[50px] rounded-md' src={imgUrl} alt="" />
            </div>
            <div className=' flex-1'>
                <h1 className=' text-gray-300'>{song.title}</h1>
                <h2 className=' text-gray-500'>{song.authors}</h2>
            </div>
            <button className='w-9 h-9 rounded-full hover:bg-gray-800 flex justify-center items-center' ref={moreBtnRef} onClick={handleSongAddPlaylist}>
                <svg className='w-7 h-2 '>
                    <path className=' fill-gray-200 scale-[1.6]' d="M2,0 C0.9,0 0,0.9 0,2 C0,3.1 0.9,4 2,4 C3.1,4 4,3.1 4,2 C4,0.9 3.1,0 2,0 L2,0 Z M14,0 C12.9,0 12,0.9 12,2 C12,3.1 12.9,4 14,4 C15.1,4 16,3.1 16,2 C16,0.9 15.1,0 14,0 L14,0 Z M8,0 C6.9,0 6,0.9 6,2 C6,3.1 6.9,4 8,4 C9.1,4 10,3.1 10,2 C10,0.9 9.1,0 8,0 L8,0 Z" />
                </svg>
            </button>
        </div>
    )
}
