import React, { useContext } from 'react'
import PlayerContext from './PlayerContext'

function DisplayCard({song}) {
  const playerState = useContext(PlayerContext);

  const handleClick = () => {
    const player = playerState.playerRef.current;
    playerState.setPlayingSong(song);
    const playAgain = () => {
      player.play();
      playerState.setPlaying(true);
      console.log('hi');
      player.removeEventListener('canplay',playAgain);
    }
    player.addEventListener('canplay',playAgain);
  }

  return (
    <div className='flex flex-col flex-none hover:bg-gray-800 w-[200px] rounded-md h-[250px] px-2 py-2 cursor-pointer' onClick={handleClick}>
        <img className='w-full max-h-[200px] rounded-xl' src={song.img} alt={song.title} />
        <h1 className=' text-gray-300 text-md'>{song.name}</h1>
        <h2 className=' text-gray-500 text-sm'>{song.author}</h2>
    </div>
  )
}

export default DisplayCard