import React from 'react'
import DisplayCard from './DisplayCard'
import DisplayData from '../assets/DisplayData'

const displayData = DisplayData.data;

const DisplaySection = ({displayData})=> {
  return (
    <>
      {displayData.map((value, index) =>{
        return (
        <section key={index} className=' w-full flex flex-col '>
          <div className=' ml-2 text-lg text-gray-200 font-bold'>{value.name}</div>
          <div className='w-full flex flex-row overflow-auto no-scrollbar'>
            {
              (value.items).map((value2,index2) => 
                  <DisplayCard key={index2} title={value2.name} img={value2.img} creater={value2.author} />
              )
            }
          </div>
        </section>
        )
      })}
    </>
  )
}

export default function Display() {
  return (
    <div className=' flex flex-col w-full h-full '>
      <div className='flex flex-col flex-1 bg-gray-900 mr-2 my-3 px-4 rounded-lg gap-4 justify-start overflow-auto no-scrollbar'>

        <nav className='flex flex-row justify-between items-center mt-3'>
          <button className='h-8 w-8 bg-black rounded-2xl'>
            <svg className=' h-4 w-4 m-auto' aria-hidden="true">
              <path className=' fill-white' d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z"></path>
            </svg>
          </button>
          <button className=' w-8 h-8 rounded-2xl text-xl border-black border-[2px] text-black bg-blue-600 '>D</button>
        </nav>

        <menu className=' flex flex-row gap-3'>
          <button className='rounded-2xl py-1 px-3 text-md text-gray-900 bg-opacity-100 bg-white'>All</button>
          <button className='rounded-2xl py-1 px-3 text-md text-white bg-opacity-20 bg-white'>Music</button>
        </menu>
        
        <DisplaySection displayData={displayData} />

      </div>
    </div>
  )
}
