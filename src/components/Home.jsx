import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <>
        <menu className=' w-full  shrink-0 flex flex-row gap-3 overflow-auto'>
            <Link to={'/'} >
                <button className='rounded-2xl py-1 px-3 text-md text-gray-900 bg-opacity-100 bg-white'>All</button>
            </Link>
            <Link to={'music'}>
                <button className='rounded-2xl py-1 px-3 text-md text-white bg-opacity-20 bg-white'>Music</button>
            </Link>
        </menu>
        <Outlet />
    </>
  )
}
