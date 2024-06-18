import React, { useEffect, useState } from 'react'
import DisplayCard from './DisplayCard';
import axios from 'axios';

export default function DisplayMusic() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3005/api/songs')
            .then((res) => {
                setSongs(res.data);
            })
            .catch((err) => console.log(err));
    },[])

    return (
        <div className='w-full flex flex-row overflow-auto no-scrollbar'>
            {
            songs.map((value,index) => 
                <DisplayCard key={index} song={value} />
            )
            }
        </div>
    )
}
