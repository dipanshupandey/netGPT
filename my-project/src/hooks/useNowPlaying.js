import { useEffect } from "react"
import { options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlaying } from "../utils/browseSlice";
import { UseSelector } from "react-redux";
const useNowPlaying=()=>{
    const dispatch=useDispatch();
    const nowPlaying=useSelector((store)=>store.browse.nowPlaying);
  async function getMovieData() {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
        options
      );
      const data = await res.json();
     
      dispatch(addNowPlaying(data.results));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(nowPlaying==null)
    getMovieData();
  }, []);
}

export default useNowPlaying;