import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserDetails from './UserDetails';

const API = process.env.REACT_APP_API;

const tempSong = {
    image:'1Dka4Owadz5FIFFRpaKVmXFtDZoAM3CJt',
    name: 'song name',
    authors: 'song authors'
}

const SongLine = ({song}) => {
    const songUrl = API + 'img/' +song.image;
    return (
        <div className='flex flex-row w-full justify-between items-center gap-2 hover:bg-gray-700 px-1 py-1 rounded'>
            <div>
                <img className=' h-[50px] rounded-md' src={songUrl} alt="" />
            </div>
            <div className=' flex-1'>
                <h1 className=' text-gray-300'>{song.name}</h1>
                <h2 className=' text-gray-500'>{song.authors}</h2>
            </div>
            <button className='w-8 h-8'>
                <svg className='w-8 h-4 '>
                    <path className=' fill-gray-200 scale-[1.6]' d="M2,0 C0.9,0 0,0.9 0,2 C0,3.1 0.9,4 2,4 C3.1,4 4,3.1 4,2 C4,0.9 3.1,0 2,0 L2,0 Z M14,0 C12.9,0 12,0.9 12,2 C12,3.1 12.9,4 14,4 C15.1,4 16,3.1 16,2 C16,0.9 15.1,0 14,0 L14,0 Z M8,0 C6.9,0 6,0.9 6,2 C6,3.1 6.9,4 8,4 C9.1,4 10,3.1 10,2 C10,0.9 9.1,0 8,0 L8,0 Z" />
                </svg>
            </button>
        </div>
    )
}


export default function Playlist() {
    const userDetails = useContext(UserDetails);
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({});

    const imgUrl = API + 'img/' + playlist.image;

    useEffect(() => {
        axios.get(API + `user/playlists/${id}`,{
            headers:{
                Authorization : `Bearer ${userDetails.userToken}`
            }
        }).then((res) => {
            setPlaylist(res.data);
        }).catch((err) => {
            console.log(err);
        })
    },[])

    return (
        <div className='flex flex-col justify-start items-center w-full h-full overflow-hidden'>
            <div>
                <img className='max-h-[30vh] rounded-t-md  w-auto' src={imgUrl} alt="" />
            </div>
            <div className=' flex flex-row justify-between items-center w-full bg-gray-800 rounded-t-lg px-3 py-3'>
                <div>
                    <h1>{playlist.name}</h1>
                    <h2>{playlist.description}</h2>
                </div>
                <button className=' w-8 h-8 bg-gray-100 rounded-full'>
                    <svg className='w-4 h-4 m-auto' aria-hidden="true">
                        <path className=' fill-gray-800' d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                    </svg>
                </button>
            </div>
            <div className='w-full flex flex-col gap-1 bg-gray-900 py-3'>
                <div className=' flex flex-row gap-2 justify-start items-center hover:bg-gray-700 px-1 py-1 rounded'>
                    <div>
                        <svg className=' h-[48px] w-[48px] rounded-md bg-gray-500' xmlns="http://www.w3.org/2000/svg">
                            <path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"/>
                            <path d="M0 0h48v48H0z" fill="none"/>
                        </svg>
                    </div>
                    <h1 className=' text-gray-300 '>Add new song</h1>
                </div>
                <SongLine index={1} song={tempSong} />
            </div>
        </div>
    )
}
