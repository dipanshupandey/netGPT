import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { useSelector } from "react-redux";
import {
  addNowPlaying,
  addPopular,
  addTopRated,
  addUpComingBollyWood,
  addDisCoverBolllyWood,
  addPopularTvShows,
  addTopRatedTvShows,
  addPopularIndianTvShows,
} from "../utils/browseSlice";

const useAddData = () => {
  const dispatch = useDispatch();
  const nowPlaying = useSelector((store) => store.browse.nowPlaying);
  const popular = useSelector((store) => store.browse.popular);
  const topRated = useSelector((store) => store.browse.topRated);
  const upComingBollyWood = useSelector((store) => store.browse.upComingBollyWood);
  const disCoverBolllyWood = useSelector((store) => store.browse.disCoverBolllyWood);
  const popularTvShows = useSelector((store) => store.browse.popularTvShows);
  const topRatedTvShows = useSelector((store) => store.browse.topRatedTvShows);
  const popularIndianTvShows = useSelector((store) => store.browse.popularIndianTvShows);

  useEffect(() => {
    // Define async function inside useEffect
    const fetchAllData = async () => {
      try {
       // 1️⃣ Now Playing (Global)
       if (!nowPlaying?.length) {
        const nowPlayingRes = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
          options
        );
        const nowPlayingData = await nowPlayingRes.json();
        dispatch(addNowPlaying(nowPlayingData.results));
      }

      // 2️⃣ Popular Movies (Global)
      if (!popular?.length) {
        const popularRes = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US",
          options
        );
        const popularData = await popularRes.json();
        dispatch(addPopular(popularData.results));
      }

      // 3️⃣ Top Rated Movies (Global)
      if (!topRated?.length) {
        const topRatedRes = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US",
          options
        );
        const topRatedData = await topRatedRes.json();
        dispatch(addTopRated(topRatedData.results));
      }

      // 4️⃣ Upcoming Bollywood Movies (India)
      if (!upComingBollyWood?.length) {
        const upcomingBollyRes = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-IN&region=IN",
          options
        );
        const upcomingBollyData = await upcomingBollyRes.json();
        dispatch(addUpComingBollyWood(upcomingBollyData.results));
      }

      // 5️⃣ Discover Bollywood Movies
      if (!disCoverBolllyWood?.length) {
        const discoverBollyRes = await fetch(
          "https://api.themoviedb.org/3/discover/movie?with_origin_country=IN&language=en-IN&sort_by=popularity.desc",
          options
        );
        const discoverBollyData = await discoverBollyRes.json();
        dispatch(addDisCoverBolllyWood(discoverBollyData.results));
      }

      // 6️⃣ Popular TV Shows (Global)
      if (!popularTvShows?.length) {
        const popularTvRes = await fetch(
          "https://api.themoviedb.org/3/tv/popular?language=en-US",
          options
        );
        const popularTvData = await popularTvRes.json();
        dispatch(addPopularTvShows(popularTvData.results));
      }

      // 7️⃣ Top Rated TV Shows (Global)
      if (!topRatedTvShows?.length) {
        const topRatedTvRes = await fetch(
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US",
          options
        );
        const topRatedTvData = await topRatedTvRes.json();
        dispatch(addTopRatedTvShows(topRatedTvData.results));
      }

      // 8️⃣ Popular Indian TV Shows
      if (!popularIndianTvShows?.length) {
        const popularIndianTvRes = await fetch(
          "https://api.themoviedb.org/3/discover/tv?with_origin_country=IN&language=en-IN&sort_by=popularity.desc",
          options
        );
        const popularIndianTvData = await popularIndianTvRes.json();
        dispatch(addPopularIndianTvShows(popularIndianTvData.results));
      } 
      } catch (err) {
        console.error("Error fetching TMDB data:", err);
      }
    };

    fetchAllData();
  }, [dispatch]); 
};

export default useAddData;
