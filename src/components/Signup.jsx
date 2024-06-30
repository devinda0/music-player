import axios from 'axios';
import React, { useState } from 'react'

const API = process.env.REACT_APP_API;

export default function Signup({setUserToken}) {
    const defaultFormData = {
        f_name : '',
        l_name : '',
        email : '',
        password : '',
    }

    const [formData, setFormData] = useState({...defaultFormData});
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.password === confirmPassword){
            axios.post(API + 'user/signup/',formData)
            .then((res) => {
                if(res.data.token) {
                    setUserToken(res.data.token);
                    localStorage.setItem('userToken',res.data.token)
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            alert("password doesn't matched");
        }
    }

    const handleFName = (e) => {setFormData((pre) => {return {...pre, f_name:e.target.value }}) }
    const handleLName = (e) => {setFormData((pre) => {return {...pre, l_name:e.target.value }}) }
    const handleEmail = (e) => {setFormData((pre) => {return {...pre, email:e.target.value }}) }
    const handlePassword = (e) => {setFormData((pre) => {return {...pre, password:e.target.value }}) }
    const handleConfirmPassword = (e) => {setConfirmPassword(e.target.value)}

  return (
    <div className=' w-full text-white'>
        <form action="" onSubmit={handleSubmit} className=' form'>

            <div className=' form-section gap-4'>
                <div className=' flex-1'>
                    <label htmlFor="f_name" className='form-label'>First Name</label>
                    <input type="text" value={formData.f_name} onChange={handleFName} name="f_name" id="f_name" className='form-input' required/>
                </div>
                <div className=' flex-1'>
                    <label htmlFor="l_name" className='form-label'>Last Name</label>
                    <input type="text" value={formData.l_name} onChange={handleLName} name="l_name" id="l_name" className='form-input' required/>
                </div>
            </div>

            <div className=' form-section'>
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="email" value={formData.email} onChange={handleEmail} name="email" id="email" className='form-input' required/>
            </div>

            <div className=' form-section'>
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password" value={formData.password} onChange={handlePassword} name="password" id="password" className='form-input' required/>
            </div>

            <div className=' form-section'>
                <label htmlFor="confirmPassword" className='form-label'>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={handleConfirmPassword} name="confirmPassword" id="confirmPassword" className='form-input' required/>
            </div>

            <div className='form-section'>
                <button type="submit" className=' form-btn'>Sign Up</button>
            </div>
        </form>
    </div>
  )
}
