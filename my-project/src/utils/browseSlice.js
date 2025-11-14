import { createSlice } from "@reduxjs/toolkit";

const browseSlice = createSlice({
  name: "browse",
  initialState: {
    nowPlaying: [],
    popular: [],
    topRated: [],
    upComingBollyWood: [],
    disCoverBolllyWood: [],
    popularTvShows: [],
    topRatedTvShows: [],
    popularIndianTvShows: [],
    selectedMovie:null,
  },
  reducers: {
    addNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    addPopular: (state, action) => {
      state.popular = action.payload;
    },
    addTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    addUpComingBollyWood: (state, action) => {
      state.upComingBollyWood = action.payload;
    },
    addDisCoverBolllyWood: (state, action) => {
      state.disCoverBolllyWood = action.payload;
    },
    addPopularTvShows: (state, action) => {
      state.popularTvShows = action.payload;
    },
    addTopRatedTvShows: (state, action) => {
      state.topRatedTvShows = action.payload;
    },
    addPopularIndianTvShows: (state, action) => {
      state.popularIndianTvShows = action.payload;
    },
    addSelectedMovie:(state,action)=>{
      state.selectedMovie=action.payload;
    },
    removeSelectedMovie:(state)=>{
      state.selectedMovie=null;
      // console.log("remo")
    }
  },
});

export const {
  addNowPlaying,
  addPopular,
  addTopRated,
  addUpComingBollyWood,
  addDisCoverBolllyWood,
  addPopularTvShows,
  addTopRatedTvShows,
  addPopularIndianTvShows,
  addSelectedMovie,
  removeSelectedMovie
} = browseSlice.actions;

export default browseSlice.reducer;
