// REMOVED - Insecure
// import { options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptResults } from "../utils/gptSlice";
// REMOVED - Insecure
// import { groq } from "../utils/constants";

function useGetMovieRecommendations() {
  const dispatch = useDispatch();

  async function getMovieRecommendations(searchKeywords) {
    
    // --- 1. Call your SECURE Groq API Proxy ---
    
    // This is the request payload. It's the same as before.
    const groqRequestBody = {
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
      response_format: { type: "json_object" },
      temperature: 0.5,
      max_tokens: 512,
    };

    // Replace the direct Groq call with a fetch to your proxy
    const gptRes = await fetch('/api/groq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(groqRequestBody),
    });

    // Our new proxy returns the 'choice' object
    const chatChoice = await gptRes.json();
    
    // Get the JSON string from the response
    const movieJsonString = chatChoice.message.content;
    const movieJson = JSON.parse(movieJsonString);
    console.log(movieJson);

    // --- 2. Call your SECURE TMDB API Proxy ---

    // The 'searchAll' function is now updated to use the TMDB proxy
    async function searchAll(query) {
      try {
        // This is the TMDB path we want to get
        const tmdbPath = `/search/multi?query=${query}&include_adult=false&language=en-US&page=1`;
        
        // This is your new proxy URL.
        const url = `/api/tmdb?path=${encodeURIComponent(tmdbPath)}`;

        // Fetch from the proxy. No 'options' needed!
        const res = await fetch(url);
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

    // --- 3. Process Results (No change needed) ---
    const movies = movieJson.movies.map((item) => {
      return searchAll(item.title);
    });
    const results = await Promise.all(movies);
    console.log(results);
    dispatch(addGptResults(results));
  }
  return getMovieRecommendations;
}
export default useGetMovieRecommendations;