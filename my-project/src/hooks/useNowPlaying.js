import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addNowPlaying } from "../utils/browseSlice";
const useNowPlaying=()=>{
    const dispatch=useDispatch();
    const nowPlaying=useSelector((store)=>store.browse.nowPlaying);
  // This is your NEW code
async function getMovieData() {
  try {
    // 1. This is the TMDB path you want to get
    const tmdbPath = "/movie/now_playing?language=en-US";

    // 2. This is your NEW proxy URL.
    // We must encode the path to safely handle special characters like '?'
    const url = `/api/tmdb?path=${encodeURIComponent(tmdbPath)}`;

    // 3. Notice the 'options' object is GONE.
    // Your API key is no longer in the browser!
    const res = await fetch(url);
    const data = await res.json();
    
    dispatch(addNowPlaying(data.results));
  } catch (error) {
    // console.log(error);
  }
}

  useEffect(() => {
    if(nowPlaying==null)
    getMovieData();
  }, []);
}

export default useNowPlaying;