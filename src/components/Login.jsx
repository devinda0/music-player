import axios from 'axios';
import React, { useState } from 'react'

const API = process.env.REACT_APP_API;


export default function Login({setUserToken}) {

    const defaultFormData = {
        email : "",
        password : ""
    }

    const [formData, setFormData] = useState({...defaultFormData});

    const handleEmailChange = (e) => {
        setFormData((pre) => {
            return {...pre, email : e.target.value}
        });
    }

    const handlePasswordChange = (e) => {
        setFormData((pre) => {
            return {...pre, password : e.target.value}
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(API + 'user/login/',formData)
            .then((res) => {
                setFormData({...defaultFormData});
                console.log(res.data);
                if(res.data.token) {
                    setUserToken(res.data.token);
                    localStorage.setItem('userToken', res.data.token);
                }
            })
            .catch((err) => console.log('err'));
    }

  return (
    <div className=' w-full text-white'>
        <form action="" onSubmit={handleSubmit} className=' form'>
            <div className='form-section'>
                <label htmlFor="email" className='form-label'>Email</label>
                <input className=' form-input' value={formData.email} type="email" name="email" id="email" onChange={handleEmailChange}/>
            </div>
            <div className='form-section'>
                <label htmlFor="password" className='form-label'>Password</label>
                <input className=' form-input font-bold text-xl ' value={formData.password} type="password" name="password" id="password" onChange={handlePasswordChange}/>
            </div>
            <div className='form-section'>
                <button type="submit" className=' form-btn'>Login</button>
            </div>
        </form>
    </div>
  )
}
