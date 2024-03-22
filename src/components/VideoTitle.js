import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
        <h1 className='text-2xl md:text-6xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/4 hidden md:inline-block'>{overview}</p>
        <div className='my-4 md:my-0'>
            <button className='text-black bg-white py-1 px-3 md:py-4 md:px-12 text-xl rounded-md hover:bg-opacity-80'>▶️ Play</button>
            <button className='mx-2 text-white bg-gray-500  p-4 px-12 text-xl bg-opacity-50 rounded-md hover:bg-opacity-80 hidden md:inline-block'>More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle