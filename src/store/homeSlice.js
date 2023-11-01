import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    movieId: 0,
  },
  reducers: {
    setTrendingMovies(state, action) {
      const movieId = action.payload;
      state.movieId = movieId;
    },
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice;
