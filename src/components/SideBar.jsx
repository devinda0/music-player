import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SidePlaylist from './SidePlaylist'
import axios from 'axios';
import UserDetails from './UserDetails';

const API = process.env.REACT_APP_API;

const testPlaylist = {
    image : "1fFsZBIuPOcwb_bZiJVYYlKfafcoda-OF",
    name : 'Test Playlist',
    description : 'Testing by DeV'
}

export default function SideBar({setNewPlaylist, newPlaylist}) {
    const [playlists, setPlaylists] = useState([]);
    const userDetails = useContext(UserDetails);

    useEffect(() => {
        axios.get(API + 'user/playlists',{
            headers:{
                Authorization : `Bearer ${userDetails.userToken}`
            }
        })
        .then((res) => {
            setPlaylists(res.data);
        })
        .catch((err) => console.log(err));
    },[userDetails.userToken, newPlaylist])

  return (
    <div className=' h-full flex flex-col w-full pl-2 py-3 gap-3'>
        <div className='w-full h-[110px] text-md font-bold rounded-xl bg-gray-900 px-5 flex flex-col justify-center items-start p-6 gap-6'>
            <Link to={'/'} className='w-full flex flex-row justify-start items-center gap-4'>
                <svg className='w-6 h-6' aria-hidden="true" >
                    <path className=' fill-white w-10 h-20' d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"></path>
                </svg>
                <span>Home</span>
            </Link>
            <Link to={'/search'} className='w-full flex flex-row justify-start items-center gap-4'>
                <svg className='w-6 h-6' aria-hidden="true">
                    <path className=' fill-white' d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path>
                </svg>
                <span>Search</span>
            </Link>
        </div>

        <div className='flex-1 overflow-hidden w-full text-md rounded-xl bg-gray-900 px-0 pt-6 flex flex-col justify-start items-start gap-1'>
            <div className='flex w-full px-5 justify-between mb-4'>
                <div className='flex flex-row gap-3'>
                    <svg className='w-6 h-6' aria-hidden="true">
                        <path className=' fill-white' d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
                    </svg>
                    <span>Your Library</span>
                </div>
                <button onClick={(e) => setNewPlaylist(true)}>
                    <svg className='w-6 h-6' aria-hidden="true">
                        <path className=' fill-white' d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                    </svg>
                </button>
            </div>

            <div className='h-[] overflow-auto w-full no-scrollbar'>
                { playlists.length === 0 &&
                    <div className=' w-[90%] flex flex-col justify-center items-start bg-gray-800 pt-2 pb-4  px-5 mx-auto rounded-md'>
                        <h2 className='text-lg'>Create your first playlist</h2>
                        <p className='text-sm'>It's easy we will help you</p>
                        <button className=' bg-white text-black rounded-3xl w-[150px] h-[35px] mt-4' onClick={(e) => setNewPlaylist(true)}>Create Playlist</button>
                    </div>
                }

                {
                    playlists.map((value, index) => {
                        return <SidePlaylist playlist={value} key={index}/>
                    })
                }
            </div>

            

        </div>
    </div>
  )
}
