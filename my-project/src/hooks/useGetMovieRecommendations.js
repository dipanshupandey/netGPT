import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptResults } from "../utils/gptSlice";
import { groq } from "../utils/constants";


function useGetMovieRecommendations() {
  const dispatch = useDispatch();

  async function getMovieRecommendations(searchKeywords) {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
            You are a movie recommendation assistant.
            You must *always* respond with a single valid JSON object.
            That object must have *one* top-level key: "movies".
            The value of "movies" must be an array of exactly 5 movie objects.
            Each object in the array must have two keys: "title" and "year".
            Do not add any other text, explanations, or markdown.
            `,
        },
        {
          role: "user",
          content: `Recommend 5 movies based on these keywords: ${searchKeywords}`,
        },
      ],
      model: "llama-3.1-8b-instant",

      // --- This is the most important part! ---
      // It forces the model to output valid JSON.
      response_format: { type: "json_object" },

      temperature: 0.5,
      max_tokens: 512,
    });

    // Get the raw JSON string from the response

    const movieJsonString = chatCompletion.choices[0].message.content;
    // Now you can parse this string and use the TMDB API
    const movieJson = JSON.parse(movieJsonString);
    console.log(movieJson);

    // (See Step 4)

    const movies = movieJson.movies.map((item) => {
      return searchAll(item.title);
    });
    const resuts = await Promise.all(movies);
    console.log(resuts);
    dispatch(addGptResults(resuts));

    // tmdbFunction
    async function searchAll(query) {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
          options
        );
        const data = await res.json();

        // Filter only movies & TV shows (ignore people)
        const filteredResults = data.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );
        return filteredResults;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
  return getMovieRecommendations;
}
export default useGetMovieRecommendations;
