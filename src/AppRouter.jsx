import React, { useEffect, useState } from 'react'
import App from './App';
import { BrowserRouter, Route, Routes, Redirect, Navigate } from 'react-router-dom';
import Display from './components/Display';
import Search from './components/Search';
import DisplayData from './assets/DisplayData';
import DisplayMusic from './components/DisplayMusic';
import DisplayAll from './components/DisplayAll';
import LoginSignup from './components/LoginSignup';
import Login from './components/Login';
import Signup from './components/Signup';
import axios from 'axios';
import Home from './components/Home';
import Playlist from './components/Playlist';

const API = process.env.REACT_APP_API;

export default function AppRouter() {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [validUser, setUserValid] = useState(true);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        axios.get(API + 'user/login/',{
            headers:{
                Authorization : `Bearer ${userToken}`
            }
        }).then((res) => {
            if(res.data.userId) {
                setUserValid(true);
                setUserId(res.data.userId);
            } else {
                setUserValid(false);
            }
        }).catch((err) => {
            console.log(err);
            setUserValid(false);
        })
    },[userToken])

    

    return (
        <BrowserRouter>
            <Routes>
                {
                    (validUser ? (
                        <>
                        <Route path='/' element={<App userToken={userToken} />}>
                            <Route path='/' element={<Display userToken={userToken} setUserToken={setUserToken} />} >
                                <Route path='/' element={<Home />}>
                                    <Route path='/' index element={<DisplayAll />} />
                                    <Route path='music' element={<DisplayMusic />} />
                                </Route>
                                <Route path='playlist/:id' element={<Playlist />} />
                            </Route>
                            <Route path='search' element={<Search />} />
                        </Route>
                        <Route path='*' element={<Navigate to={'/'} replace/>} />
                        </>
                    ) : (
                        <>
                        <Route path='/' element={<LoginSignup />}>
                            <Route path='/' index element={<Login setUserToken={setUserToken} />} />
                            <Route path='signup' element={<Signup setUserToken={setUserToken} />} />
                        </Route>
                        <Route path='*' element={<Navigate to={'/'} replace/>} />
                        </>
                    ))
                }
            </Routes>
        </BrowserRouter>
    )
}
