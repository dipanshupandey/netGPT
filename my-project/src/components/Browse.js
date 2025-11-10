import useAddData from "../hooks/useAddData";
import Hero from "./Hero";
import Movies from "./Movies";
const Browse = () => {
    
    useAddData();
  return <div className="bg-black">
    <Hero/>
    <Movies className=""/>
  </div>;
};

export default Browse;
