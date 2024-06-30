import React, { useContext} from 'react'
import PlayerContext from './PlayerContext'
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API;

function DisplayCard({song, type}) {
  const playerState = useContext(PlayerContext);
  const imageUrl = API + 'img/' + song.image;
  const title = type === 'playlist' ? song.name : song.title;
  const description = type === 'playlist' ? song.description : song.authors;
  const navigate = useNavigate();

  const handleSongClick = () => {
    const player = playerState.playerRef.current;
    playerState.setPlayingSong(song);
    const playAgain = () => {
      player.play();
      playerState.setPlaying(true);
      player.removeEventListener('canplay',playAgain);
    }
    player.addEventListener('canplay',playAgain);
  }

  const handlePlaylistClick = () => {
    navigate('/playlist/' + song.playlistId);
  }

  return (
    <div 
      className='flex flex-col flex-none hover:bg-gray-800 w-[200px] rounded-md h-[250px] px-2 py-2 cursor-pointer' 
      onClick={type === 'playlist' ? handlePlaylistClick : handleSongClick}
      >
        <img className='w-full max-h-[200px] rounded-xl' src={imageUrl} alt={title} />
        <h1 className=' text-gray-300 text-md'>{title}</h1>
        <h2 className=' text-gray-500 text-sm'>{description}</h2>
    </div>
  )
}

export default DisplayCard