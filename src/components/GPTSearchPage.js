import React from 'react'
import GTPSearchBar from './GTPSearchBar'
import GTPMovieSuggestions from './GTPMovieSuggestions'
import {BG_URL} from "../utils/constants";

const GPTSearchPage = () => {
  return (
    <div>
       <div className='absolute -z-10'>
            <img src={BG_URL} alt="netflixBackground"/>
        </div>
        <GTPSearchBar/>
        <GTPMovieSuggestions/>
    </div>
  )
}

export default GPTSearchPage