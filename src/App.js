import React from 'react'
import MiniPlayer from './components/MiniPlayer'
import SideBar from './components/SideBar'
import Display from './components/Display'

export default function App() {
  return (
    <div className=' flex flex-col bg-black text-white w-full h-screen'>
      <div className='flex-1 overflow-auto flex flex-row gap-2 justify-start align-top'>
        <div className=' h-full w-1/4'>
          <SideBar />
        </div>
        <div className=' h-full w-3/4'>
          <Display />
        </div>
      </div>
      <div className='h-[75px]'>
        <MiniPlayer />
      </div>
    </div>

  )
}
