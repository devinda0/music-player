import React, {useState, useEffect, useContext} from 'react'
import DisplayCard from './DisplayCard'
import axios from 'axios';
import UserDetails from './UserDetails';

const API = process.env.REACT_APP_API;

export default function DisplayAll({}) {
    const [displayData, setDisplayData] = useState([]);
    const userDetails = useContext(UserDetails);

    useEffect(() => {
        axios.get(API + 'user/displaydata/',{
            headers:{
                Authorization : `Bearer ${userDetails.userToken}`
            }
        }).then((res) => {
            setDisplayData(res.data);
        }).catch((err) => {
            console.log(err);
        })
    },[userDetails.userToken]);


    return (
        <>
        {displayData.map((value, index) =>{
            return (
            <section key={index} className=' w-full flex flex-col '>
            <div className=' ml-2 text-lg text-gray-200 font-bold'>{value.name}</div>
            <div className='w-full flex flex-row overflow-auto no-scrollbar'>
                {
                (value.items).map((value2,index2) => 
                    <DisplayCard type={value.type} key={index2} song={value2} />
                )
                }
            </div>
            </section>
            )
        })}
        </>
    )
}
