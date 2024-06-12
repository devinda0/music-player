import React, { useState } from 'react'
import MiniPlayer from './components/MiniPlayer'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'
import PlayerContext from './components/PlayerContext'
import initialSong from './assets/yashodara.mp3'


export default function App() {
  const [playingSong,setPlayingSong] = useState(initialSong);
  const [playing, setPlaying] = useState(false);

  const changeSong = (nextSong) => setPlayingSong(require(nextSong));

  const playerState = {
    playingSong,
    changeSong,
    playing,
    setPlaying,
  };

  return (
    <PlayerContext.Provider value={playerState}>

      <div className=' flex flex-col bg-black text-white w-full h-screen'>
        <div className='flex-1 overflow-hidden flex flex-row gap-2 justify-start align-top'>
          <div className=' h-full w-1/4 min-w-[225px]'>
            <SideBar />
          </div>
          <div className=' h-full flex-1 overflow-hidden'>
            <Outlet />
          </div>
        </div>
        <div className='h-[75px]'>
          <MiniPlayer />
        </div>
      </div>

    </PlayerContext.Provider>
  )
}
