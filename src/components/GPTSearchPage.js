import React from 'react'
import GTPSearchBar from './GTPSearchBar'
import GTPMovieSuggestions from './GTPMovieSuggestions'
import {BG_URL} from "../utils/constants";

const GPTSearchPage = () => {
  return (
    <>
    <div className='fixed -z-10'>
      <img className='h-screen w-screen object-cover' src={BG_URL} alt="netflixBackground"/>
    </div>
    <div>
        <GTPSearchBar/>
        <GTPMovieSuggestions/>
    </div>
    </>
  )
}

export default GPTSearchPage