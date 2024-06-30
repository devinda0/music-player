import React, { useContext, useState, useRef, useEffect } from 'react'
import PlayerContext from './PlayerContext';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API;

export default function Display({userToken, setUserToken}) {
  const PlayerState = useContext(PlayerContext);
  const [userMenu, setUserMenu] = useState(false);
  const menuRef = useRef(null);
  const profileImgRef = useRef(null);

  const handleMenu = (e) => {
    if(menuRef.current && profileImgRef.current && !(menuRef.current.contains(e.target) || profileImgRef.current.contains(e.target)) ){
      setUserMenu(false);
    }
  }

  const handleLogOut = () => {
    axios.delete(API + 'user/logout/',{
      headers:{
        Authorization : `Bearer ${userToken}`
      }
    }).then((res) => {
      localStorage.removeItem('userToken');
      setUserToken(null);
    })
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleMenu);

    return () => {
      document.removeEventListener('mousedown', handleMenu);
    }
  },[])

  return (
    <div className=' flex flex-col w-full h-full '>
      <div className='flex flex-col flex-1 bg-gray-900 mr-2 my-3 px-4 rounded-lg gap-4 justify-start overflow-auto no-scrollbar'>

        <nav className=' w-full flex flex-row justify-between items-center mt-3'>
          <button className=' hidden sm:block h-8 w-8 bg-black rounded-2xl'>
            <svg className=' h-4 w-4 m-auto' aria-hidden="true">
              <path className=' fill-white' d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
            </svg>
          </button>

          <button className=' block sm:hidden h-8 w-8' onClick={() => PlayerState.setIsMenu(!PlayerState.isMenu)}>
            <svg className={(PlayerState.isMenu? 'hidden':'') + ' h-6 w-6 m-auto'} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">
              <path className='fill-white' d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
            </svg>
            <svg className={(PlayerState.isMenu? '':'hidden') + ' h-6 w-6 m-auto'} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                <path className=' fill-white' d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
            </svg>
          </button>

          <div className=' relative w-[140px]'>
            <div className='flex justify-end'>
              <button 
                className={(PlayerState.isMenu? 'hidden':'') + ' sm:block ali w-8 h-8 rounded-2xl text-xl border-black border-[2px] text-black bg-blue-600 '}
                onClick={() => {setUserMenu((pre) => !pre)}}
                ref={profileImgRef}
              >
                D
              </button>
            </div>
            { userMenu &&
              <div className=' mt-1 flex flex-col items-start rounded-md absolute w-[140px] bg-gray-700' ref={menuRef}>
                <button className='w-full py-1 text-center rounded-md hover:bg-gray-300 hover:text-black font-semibold'>Account setting</button>
                <button className='w-full py-1 text-center rounded-md hover:bg-gray-300 hover:text-black font-semibold' onClick={handleLogOut}>Log out</button>
              </div>
            }
          </div>
        </nav>

        <Outlet />
        
      </div>
    </div>
  )
}
