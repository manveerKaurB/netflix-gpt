import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstants';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMoviesResult } from '../utils/gtpSlice';

const GTPSearchBar = () => {
 const langKey = useSelector(store => store.config.lang);
 const searchText = useRef(null);
 const dispatch = useDispatch();
// search movie in tmdb database
const searchMovieTMDB = async (movieName) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movieName+'&include_adult=false&language=en-US&page=1', API_OPTIONS);
    const json = await data.json();
    return json.results;
 }
 const handleGPTSearchClick = async () => {
    // make an api call to GPT API and get movie results
    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query" + searchText.current.value + ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
    const gptResults = await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery}],
        model: 'gpt-3.5-turbo',
      });
    if(!gptResults.choices){
        return <div>No results found!!</div>
    }
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(", ");
    // for each movie i will search tmdb api and find out results of all movies
    const promiseArray = gptMovies.map((movie)=>searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    dispatch(addGptMoviesResult({movieNames: gptMovies,movieResults: tmdbResults}));
    // Promise.all takes array of promises, awaiting promise.all to resolve, promise.all will finish once all promises are resolved
 }
  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>
        <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=> e.preventDefault()}>
            <input type="text" ref={searchText} className='p-4 m-4 col-span-9' placeholder={lang[langKey].gtpSearchPlaceholder}/>
            <button className='py-2 px-4 col-span-3 m-4 bg-red-700 text-white rounded-lg'
            onClick={handleGPTSearchClick}
            >{lang[langKey].Search}</button>
        </form>
    </div>
  )
}

export default GTPSearchBar