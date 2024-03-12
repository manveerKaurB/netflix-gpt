import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector(store=> store.movies);
  return (
   <div className='bg-black'>
        <div className='-mt-36 pl-12 relative z-20'>
             <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
             <MovieList title={"Trending"} movies={movies.topRatedMovies}/>
             <MovieList title={"Popular"} movies={movies.popularMovies}/>
             <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
             {
            /*
            Movielist - Popular
               MovieCards * n
            Movielist - NowPlaying
            Movielist - Trending
            Movielist - Horror
            */
             }
        </div>
    </div>
  );
}

export default SecondaryContainer