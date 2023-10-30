import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: { 
        movieTitle: "",
        movieImg: "",
        movieOverView: "",
        movieReleaseDate: "",
     },
    reducers: {
        setPopularMovies(state, action) {
            const movie = action.payload
            state.movieTitle = movie.movieTitle
            state.movieImg = movie.movieImg
            state.movieOverView = movie.movieOverView
            state.movieReleaseDate = movie.movieReleaseDate
         }
    }
})

export const homeActions = homeSlice.actions;

export default homeSlice;