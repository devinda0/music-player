import React from 'react'

export default function DisplayAll({displayData}) {
    return (
        <>
        {displayData.map((value, index) =>{
            return (
            <section key={index} className=' w-full flex flex-col '>
            <div className=' ml-2 text-lg text-gray-200 font-bold'>{value.name}</div>
            <div className='w-full flex flex-row overflow-auto no-scrollbar'>
                {
                // (value.items).map((value2,index2) => 
                //     <DisplayCard key={index2} song={value2} />
                // )
                }
            </div>
            </section>
            )
        })}
        </>
    )
}
