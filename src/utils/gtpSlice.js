import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:'gpt',
    initialState: {
        showGTPSearch : false,
        movieNames: null,
        movieResults: null    
    },
    reducers: {
        toggleGTPSearchView: (state) =>{
            state.showGTPSearch = !state.showGTPSearch;
        },
        addGptMoviesResult: (state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;

        }
    }
})

export const {toggleGTPSearchView, addGptMoviesResult} = gptSlice.actions;
export default gptSlice.reducer;