import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const navStyles = (isActive) => {
    return (isActive.isActive ? {
        "backgroundColor": "white",
        "color": "black"
    } : {});
}

export default function LoginSignup() {
  return (
    <div className='w-full bg-gray-500 h-screen flex items-center justify-center'>
        <div className=' bg-gray-950 rounded-sm flex flex-col items-center  px-10 py-10 max-w-[600px] w-[90%]'>
            <nav className=' bg-gray-600 font-bold text-xl rounded-lg flex flex-row justify-center items-center gap-0 min-w-[150px] w-full'>
                <NavLink to={'/'} style={navStyles} className='  rounded-lg flex-1 m-auto text-center text-white py-2'>Login</NavLink>
                <NavLink to={'signup'} style={navStyles} className=' rounded-lg flex-1 m-auto text-center text-white py-2'>Sign Up</NavLink>
            </nav>

            <Outlet />
        </div>
    </div>
  )
}
