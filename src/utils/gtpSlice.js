import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:'gpt',
    initialState: {
        showGTPSearch : false
    },
    reducers: {
        toggleGTPSearchView: (state) =>{
            state.showGTPSearch = !state.showGTPSearch;
        }
    }
})

export const {toggleGTPSearchView} = gptSlice.actions;
export default gptSlice.reducer;