import React from 'react'

function DisplayCard({title, creater, img}) {
  return (
    <div className='flex flex-col flex-none hover:bg-gray-800 w-[200px] rounded-md h-[250px] px-2 py-2 cursor-pointer'>
        <img className='w-full max-h-[200px] rounded-xl' src={img} alt={title} />
        <h1 className=' text-gray-300 text-md'>{title}</h1>
        <h2 className=' text-gray-500 text-sm'>{creater}</h2>
    </div>
  )
}

export default DisplayCard