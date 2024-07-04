import React, { useContext, useEffect, useRef, useState } from 'react'
import PlayerContext from './PlayerContext';

const API = process.env.REACT_APP_API;

export default function MiniPlayer() {
    const slider = useRef(null);
    const audioRef = useRef(null);
    const soundRef = useRef(null);
    const playerState = useContext(PlayerContext);
    const [progressWidth, setProgressWidth] = useState(0);
    const [sound, setSound] = useState(0);
    const [startTime, setStartTime] = useState({minute:0,seconds:0});
    const [endTime, setEndTime] = useState({minute:0,seconds:0});
    const [isMute, setIsMute] = useState(false);
    const songUrl = API + 'audio/test/' + playerState.playingSong.url;
    const imgUrl = API + 'img/' + playerState.playingSong.image;


    const startChangeSound = (e) => {
        window.addEventListener('mousemove', changeSound);
        window.addEventListener('mouseup', stopChangeSound);
    }

    const stopChangeSound = (e) => {
        window.removeEventListener('mousemove', changeSound);
        window.removeEventListener('mouseup', stopChangeSound);
    }

    const changeSound = (e) => {
        let newWidth = e.clientX - soundRef.current.offsetLeft;
        newWidth = (newWidth < 0) ? 0 : ((newWidth > 60) ? 60 : newWidth); 
        setSound(newWidth);
        audioRef.current.volume = newWidth/60;
        if(newWidth === 0) handleMute();
        if(newWidth>0) handleUnmute();
    }

    const startChangeSlider = (e) => {
        window.addEventListener('mousemove', changeSlider);
        window.addEventListener('mouseup',stopChangeSlider);
    }

    const stopChangeSlider = (e) => {
        window.removeEventListener('mousemove', changeSlider);
        window.removeEventListener('mouseup', stopChangeSlider);
    }

    const changeSlider = (e) => {
        let fullWidth = slider.current.clientWidth;
        let newWidth = e.clientX - slider.current.offsetLeft;
        newWidth = (newWidth < 0) ? 0 : ((newWidth > fullWidth) ? fullWidth : newWidth); 
        let newTime = audioRef.current.duration * (newWidth/fullWidth);
        console.log(audioRef.current.seekable.end(0));
        audioRef.current.currentTime = newTime;
    }

    const loadAudio = () => {
        return (new Promise((resolve, reject) =>{
            if(playerState.playingSong.url){
                audioRef.current.load();
                resolve(audioRef.current);
            } else {
                reject('There are no audio selected');
            }
    }))}

    const playAudio = () => {
        if(!playerState.playing){
            loadAudio().then((result) => {
                result.play();
            }).catch((err) => console.log(err));
            playerState.setPlaying(true);
        }
    }

    const pauseAudio = () => {
        if(playerState.playing){
            audioRef.current.pause();
            playerState.setPlaying(false);
        }
    }

    const handleMute = () => {
        setIsMute(true);
        audioRef.current.muted = true;
    }

    const handleUnmute = () => {
        setIsMute(false);
        audioRef.current.muted = false;
    }

    useEffect(() =>{
        const audio = audioRef.current;
        playerState.setPlayerRef(audioRef);

        setSound(audio.volume * 60);

        const updateStartTime = () => {
            setStartTime({
                minute: Math.floor(audio.currentTime/60),
                seconds: Math.floor(audio.currentTime%60)
            });
            setProgressWidth((100*(audio.currentTime/ audio.duration)));
        };

        const updateEndTime = () => {
            setEndTime({
                minute: Math.floor(audio.duration/60),
                seconds: Math.floor(audio.duration%60)
            });
        };

        audio.addEventListener('timeupdate',updateStartTime);
        audio.addEventListener('loadedmetadata',updateEndTime);

        return () => {
            audio.removeEventListener('timeupdate',updateStartTime);
            audio.removeEventListener('loadedmetadata',updateEndTime);
        };
    },[playerState,audioRef, songUrl]);

  return (
    <div className='w-full h-full bg-gray-900 flex flex-row justify-between items-center pl-4 pr-4 sm:pl-2 sm:pr-4'>
        <div className='flex flex-row items-center gap-5'>
            <img className='h-[60px] w-[60px] rounded-md' src={imgUrl} alt='playing song' />
            <div className=' min-w-[200px] flex flex-row items-center gap-5'>
                <div>
                    <h1 className=' text-sm text-gray-300 font-extralight'>{playerState.playingSong.title}</h1>
                    <h2 className=' text-sm text-gray-500 font-extralight'>{playerState.playingSong.authors}</h2>
                </div>
            </div>
        </div>

        <div className='flex-1 flex flex-col items-end pr-1 sm:pr-0 sm:items-center justify-center gap-2'>
            <div className='flex flex-row items-center justify-center gap-5'>
                <button className=' hidden sm:block'>
                    <svg className='w-4 h-4' aria-hidden="true">
                        <path className=' fill-white' d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
                    </svg>
                </button>
                <button className={(playerState.playing?'':'hidden') + ' w-8 h-8 bg-white rounded-2xl'} onClick={pauseAudio}>
                    <svg className='w-4 h-4 m-auto' aria-hidden="true">
                        <path className=' fill-gray-800' d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
                    </svg>
                </button>
                <button className={(playerState.playing?'hidden':'') +' w-8 h-8 bg-white rounded-2xl'} onClick={playAudio}>
                    <svg className='w-4 h-4 m-auto' aria-hidden="true">
                        <path className=' fill-gray-800' d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                    </svg>
                </button>
                <button className=' hidden sm:block' onClick={(e) => {audioRef.current.currentTime = 100;}}>
                    <svg className='w-4 h-4' aria-hidden="true">
                        <path className=' fill-white' d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
                    </svg>
                </button>
            </div>
            <div className='hidden w-full justify-center sm:flex flex-row items-center gap-2'>
                <div className=' w-[20px] shrink-0 text-[10px] text-gray-500'>{startTime.minute + ':' + startTime.seconds}</div>
                <div className=' w-[70%] shrink-0 h-1 bg-gray-500 flex flex-row justify-start items-center cursor-pointer' ref={slider} onClick={changeSlider}>
                    <div className='h-1 bg-gray-100' style={{'width': `${progressWidth}%`}} ></div>
                    <div className='w-2 h-2 bg-gray-100 rounded-lg -ml-1 cursor-pointer' onMouseDown={startChangeSlider}></div>
                </div>
                <div className=' w-20px shrink-0 text-[10px] text-gray-500'>{endTime.minute + ':' + endTime.seconds}</div>
            </div>
        </div>

        <div className=' flex-row items-center gap-5 hidden sm:flex'>
            <button>
                <svg className='w-4 h-4' aria-hidden="true">
                    <path className=' fill-white' d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
                </svg>
            </button>
            <button className={isMute?'hidden':''} onClick={handleMute}>
                <svg className={' w-4 h-4'} aria-label="Volume high" aria-hidden="true">
                    <path className='fill-white' d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
                    <path className=' fill-white' d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
                </svg>
            </button>
            <button className={isMute?'':'hidden'} onClick={handleUnmute} >
                <svg className='w-4 h-4' aria-label="Volume off" aria-hidden="true">
                    <path className=' fill-white' d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
                    <path className=' fill-white' d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
                </svg>
            </button>
            <div className='w-[60px] h-1 bg-gray-500 flex flex-row justify-start items-center cursor-pointer' onClick={changeSound}>
                <div className='h-1 bg-gray-100' style={{'width': `${sound}px`}} ref={soundRef} ></div>
                <div className='w-2 h-2 bg-gray-100 rounded-lg -ml-1 cursor-pointer' onMouseDown={startChangeSound}></div>
            </div>
            {/* <button>
                <svg className='w-4 h-4' aria-hidden="true">
                    <path className=' fill-white' d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0z"></path>
                </svg>
            </button> */}
        </div>
        
        <audio ref={audioRef} preload='auto' src={songUrl} typeof='audio/mp3' />
    </div>
  )
}
