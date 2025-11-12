// This file is /api/tmdb.js

export default async function handler(request, response) {
    // Get the API key from Vercel's "Environment Variables"
    // We will set this up in the Vercel dashboard later.
    const TMDB_API_KEY = process.env.VITE_TMDB_API_KEY;
  
    // Get the TMDB path from our React app's request
    // e.g., /api/tmdb?path=/movie/popular
    const path = request.query.path;
  
    if (!path) {
      return response.status(400).json({ error: "Missing 'path' query parameter." });
    }
  
    // Re-create the full TMDB URL, adding the secure API key
    const TMDB_BASE_URL = "https://api.themoviedb.org/3";
    const separator = path.includes("?") ? "&" : "?";
    const fullUrl = `${TMDB_BASE_URL}${path}${separator}api_key=${TMDB_API_KEY}`;
  
    try {
      // We use 'fetch' to call the TMDB API from the server
      const tmdbRes = await fetch(fullUrl);
      
      if (!tmdbRes.ok) {
        // If TMDB sends an error, pass it along
        const errorData = await tmdbRes.json();
        return response.status(tmdbRes.status).json({ error: errorData });
      }
  
      const data = await tmdbRes.json();
      
      // Send the data from TMDB back to your React app
      return response.status(200).json(data);
  
    } catch (error) {
      // Handle any other server errors
      return response.status(500).json({ error: error.message });
    }
  }