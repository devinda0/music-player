import React, { useEffect, useState } from 'react'
import MiniPlayer from './components/MiniPlayer'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'
import PlayerContext from './components/PlayerContext'
import axios from 'axios'
import UserDetails from './components/UserDetails'

const API = process.env.REACT_APP_API;

const PlaylistLine = ({playlist, songId}) => {
  const imgUrl = API + 'img/' + playlist.image;
  const [songAdded, setSongAdded] = useState(!!playlist.hasSong);

  const handleSongAdd = (e) => {
    axios.post(`${API}user/playlists/addsong`,{
      songId,
      playlistId : playlist.playlistId,
      isAddSong : !songAdded
    }).then((res) => {
      setSongAdded(res.data.hasSong);
    }).catch((err) => console.log(err))
  }

  return (
    <div className='w-full h-[60px] flex flex-row justify-between items-center gap-2 hover:bg-gray-700 px-2 py-1 rounded-md'>
      <div>
        <img className=' h-[50px] rounded-md' src={imgUrl} alt="" />
      </div>
      <div className=' flex-1'>
          <h1 className=' text-gray-300'>{playlist.name}</h1>
          <h2 className=' text-gray-500'>{playlist.description}</h2>
      </div>
      <input type='checkbox' checked={songAdded} onChange={handleSongAdd} />
    </div>
  )
}

export default function App({userToken, setUserToken}) {
  const [playingSong,setPlayingSong] = useState({});
  const [playing, setPlaying] = useState(false);
  const [playerRef, setPlayerRef] = useState(null);
  const [isMenu, setIsMenu] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isAddingSong, setIsAddingSong] = useState(false);
  const [addingSongId,setAddingSongId] = useState(2);
  const [playlistsToAdd, setPlaylistsToAdd] = useState([]);

  const handleFormCancel = (e) => {
    setNewPlaylistName('');
    setNewPlaylist(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(API + 'user/playlist',{
      name : newPlaylistName
    },{
      headers:{
        Authorization : `Bearer ${userDetails.userToken}`
      }
    }).then((res) => {
      setNewPlaylist(false);
    }).catch((err) => console.log(err))
    .finally(() => setNewPlaylistName(''));

  }

  useEffect(() => {
    axios.get(API + 'songs/2')
      .then((res) => setPlayingSong(res.data))
      .catch((err) => console.log(err));
  },[])

  useEffect(() => {
    if(addingSongId){
      axios.post(`${API}user/playlists/exists`,{songId : addingSongId},{
        headers : {
          Authorization : `Bearer ${userToken}`
        }
      }).then((res) => {
        setPlaylistsToAdd(res.data.playlists);
      }).catch((err) => {
        console.log(err);
      })
    }
  },[addingSongId, isAddingSong])

  const userDetails = {
    userToken,
    setUserToken,
    setIsAddingSong,
    setAddingSongId
  }

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
    <UserDetails.Provider value={userDetails}>
    <PlayerContext.Provider value={playerState}>

      <div className=' flex flex-col bg-black text-white w-full h-[100dvh]'>
        <div className='flex-1 overflow-hidden flex flex-row gap-2 justify-start align-top relative'>
          <div className={(!isMenu?'hidden': '') +  ' w-[60%] sm:block h-full sm:w-1/4 min-w-[225px]'}>
            <SideBar setNewPlaylist={setNewPlaylist} newPlaylist={newPlaylist} />
          </div>

          <div className=' h-full flex-1 overflow-hidden'>
            <Outlet />
          </div>

          { newPlaylist &&
            <div className=' absolute z-50 w-full h-full'>
              <div className=' w-full h-full flex justify-center items-center relative'>
                <form className='flex flex-col w-[250px] gap-2 my-auto bg-gray-900 rounded-lg text-white text-center z-50 px-6 py-4' onSubmit={handleSubmit}>
                  <label className=' block text-gray-50' htmlFor='playlistName'>Enter name for new playlist</label>
                  <input 
                    className=' w-full block text-gray-900 px-1 rounded h-7'
                    type='text' 
                    id='playlistName'
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  <div className=' flex flex-row justify-around gap-2 my-2'>
                    <button type='submit' className=' flex-1 bg-gray-600 py-1 rounded-md hover:bg-gray-100 hover:text-gray-950'>Create</button>
                    <button className=' flex-1 bg-gray-600 py-1 rounded-md hover:bg-gray-100 hover:text-gray-950' onClick={handleFormCancel}>Cancel</button>
                  </div>
                </form>
                <div className='w-full h-full bg-gray-600 absolute opacity-50'></div>
              </div>
            </div>
          }

          { isAddingSong &&
          <div className=' absolute w-full h-full'>
            <div className='w-full h-full flex justify-center items-center relative px-7 md:px-0'>
              <div className='w-full md:w-[50%] max-h-[80%] px-3 md:px-10 py-7 gap-7 flex flex-col justify-start items-center bg-gray-900 z-50 rounded-xl'>

                <h1 className=' text-xl text-gray-100 font-bold'>Select playlists to add</h1>
                <div className='w-full '>
                  {
                    playlistsToAdd.map((value, index) => <PlaylistLine songId={addingSongId} playlist={value} key={index} />)
                  }
                </div>
                <button className=' w-[120px] h-[40px] rounded-2xl bg-green-400 text-gray-900 text-xl font-bold' onClick={(e) => setIsAddingSong(false)}>Done</button>

              </div>
              <div className='w-full h-full absolute bg-gray-600 z-20 opacity-[0.5]'></div>
            </div>
          </div>
          }

        </div>
        <div className='h-[75px]'>
          <MiniPlayer />
        </div>
      </div>

    </PlayerContext.Provider>
    </UserDetails.Provider>
  )
}
