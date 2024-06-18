import React, { useEffect, useState } from 'react'
import MiniPlayer from './components/MiniPlayer'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'
import PlayerContext from './components/PlayerContext'
import axios from 'axios'


export default function App() {
  const [playingSong,setPlayingSong] = useState({});
  const [playing, setPlaying] = useState(false);
  const [playerRef, setPlayerRef] = useState(null);
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3005/api/songs/2')
      .then((res) => setPlayingSong(res.data))
      .catch((err) => console.log(err));
  },[])

  const playerState = {
    playingSong,
    setPlayingSong,
    playing,
    setPlaying,
    isMenu,
    setIsMenu,
    playerRef,
    setPlayerRef
  };

  return (
    <PlayerContext.Provider value={playerState}>

      <div className=' flex flex-col bg-black text-white w-full h-screen'>
        <div className='flex-1 overflow-hidden flex flex-row gap-2 justify-start align-top'>
          <div className={(!isMenu?'hidden': '') +  ' w-[60%] sm:block h-full sm:w-1/4 min-w-[225px]'}>
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
