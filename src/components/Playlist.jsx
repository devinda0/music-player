import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserDetails from './UserDetails';
import SongLine from './SongLine';

const API = process.env.REACT_APP_API;

const tempSong = {
    image:'1Dka4Owadz5FIFFRpaKVmXFtDZoAM3CJt',
    name: 'song name',
    authors: 'song authors'
}


export default function Playlist() {
    const userDetails = useContext(UserDetails);
    const { id } = useParams();
    const [playlist, setPlaylist] = useState({});
    const [songs, setSongs] = useState([]);
    const [canAddSongs, setCanAddSongs] = useState(false);

    const imgUrl = API + 'img/' + playlist.image;

    useEffect(() => {
        axios.get(API + `user/playlists/${id}`,{
            headers:{
                Authorization : `Bearer ${userDetails.userToken}`
            }
        }).then((res) => {
            setPlaylist(res.data.playlist);
            setCanAddSongs(res.data.canAddSongs)
            setSongs(res.data.songs)
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
                { canAddSongs &&
                    <div className=' flex flex-row gap-2 justify-start items-center hover:bg-gray-700 px-1 py-1 rounded'>
                        <div>
                            <svg className=' h-[48px] w-[48px] rounded-md bg-gray-500' xmlns="http://www.w3.org/2000/svg">
                                <path d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z"/>
                                <path d="M0 0h48v48H0z" fill="none"/>
                            </svg>
                        </div>
                        <h1 className=' text-gray-300 '>Add new song</h1>
                    </div>
                }

                {
                    songs.map((song, index) => <SongLine key={index} song={song} />)
                }

            </div>
        </div>
    )
}
