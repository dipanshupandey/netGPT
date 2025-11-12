import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// ❌ We no longer need 'options', so the import is removed.
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

  // --- Select all data from the store ---
  const nowPlaying = useSelector((store) => store.browse.nowPlaying);
  const popular = useSelector((store) => store.browse.popular);
  const topRated = useSelector((store) => store.browse.topRated);
  const upComingBollyWood = useSelector((store) => store.browse.upComingBollyWood);
  const disCoverBolllyWood = useSelector((store) => store.browse.disCoverBolllyWood);
  const popularTvShows = useSelector((store) => store.browse.popularTvShows);
  const topRatedTvShows = useSelector((store) => store.browse.topRatedTvShows);
  const popularIndianTvShows = useSelector((store) => store.browse.popularIndianTvShows);

  useEffect(() => {
    // --- Helper function to fetch from our proxy ---
    const fetchData = async (tmdbPath, dispatchAction) => {
      try {
        // Build the secure proxy URL
        const url = `/api/tmdb?path=${encodeURIComponent(tmdbPath)}`;
        
        // Fetch without the 'options' object
        const res = await fetch(url);
        const data = await res.json();

        // Dispatch to Redux
        if (data && data.results) {
          dispatch(dispatchAction(data.results));
        }
      } catch (err) {
        console.error(`Error fetching data for ${tmdbPath}:`, err);
      }
    };

    // --- Create a list of all fetches we need to run ---
    const fetchPromises = [];

    // Only add a fetch if the data doesn't already exist
    if (!nowPlaying?.length) {
      fetchPromises.push(
        fetchData("/movie/now_playing?language=en-US", addNowPlaying)
      );
    }
    if (!popular?.length) {
      fetchPromises.push(
        fetchData("/movie/popular?language=en-US", addPopular)
      );
    }
    if (!topRated?.length) {
      fetchPromises.push(
        fetchData("/movie/top_rated?language=en-US", addTopRated)
      );
    }
    if (!upComingBollyWood?.length) {
      fetchPromises.push(
        fetchData("/movie/upcoming?language=en-IN&region=IN", addUpComingBollyWood)
      );
    }
    if (!disCoverBolllyWood?.length) {
      fetchPromises.push(
        fetchData(
          "/discover/movie?with_origin_country=IN&language=en-IN&sort_by=popularity.desc",
          addDisCoverBolllyWood
        )
      );
    }
    if (!popularTvShows?.length) {
      fetchPromises.push(
        fetchData("/tv/popular?language=en-US", addPopularTvShows)
      );
    }
    if (!topRatedTvShows?.length) {
      fetchPromises.push(
        fetchData("/tv/top_rated?language=en-US", addTopRatedTvShows)
      );
    }
    if (!popularIndianTvShows?.length) {
      fetchPromises.push(
        fetchData(
          "/discover/tv?with_origin_country=IN&language=en-IN&sort_by=popularity.desc",
          addPopularIndianTvShows
        )
      );
    }

    // --- Run all pending fetches in parallel ---
    if (fetchPromises.length > 0) {
      Promise.all(fetchPromises);
    }

  }, [
    dispatch,
    nowPlaying,
    popular,
    topRated,
    upComingBollyWood,
    disCoverBolllyWood,
    popularTvShows,
    topRatedTvShows,
    popularIndianTvShows,
  ]);
};

export default useAddData;