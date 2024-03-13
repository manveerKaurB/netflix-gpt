import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GPTSearchPage from './GPTSearchPage';
import { useSelector } from 'react-redux';
const Browse = () => {
  const showGTPSearch = useSelector(store=> store.gpt.showGTPSearch);
  // calling custo hook
  useNowPlayingMovies();
  useTopRatedMovies();
  usePopularMovies();
  useUpcomingMovies();
  return (
    <div>
      <Header/>
      {showGTPSearch ? <GPTSearchPage/> :
       <>
       <MainContainer/>
       <SecondaryContainer/>
       </>}
     
      {
        /*
         Main Container 
            - VideoBackground
            - VideoTitle
          Secondary Container
            - MovieList * n
              - cards * n
        */
      }
    </div>
  )
}

export default Browse