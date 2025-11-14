# NetGPT: AI-Powered Movie Recommendation Hub


---

## 🚀 Live Demo

**Experience NetGPT live:** [**https://net-gpt-five.vercel.app**](https://net-gpt-five.vercel.app)

* **Test User:** `test100@user.com`
* **Password:** `Hello@123`

---

## 📖 Project Overview

NetGPT is a modern, responsive web application that revolutionizes how you discover movies. It's a Netflix-style UI combined with the power of Generative AI.

It uses the **Groq AI** (LLaMA 3.1) to understand natural language queries (e.g., *"Show me 5 funny action movies from the 80s"*) and provides instant, curated recommendations. This is *not* a simple text search; it's a full recommendation engine powered by an LLM.

The project also solves a critical technical challenge: the **TMDB API is blocked in some regions** (like India). This application bypasses this by using a **secure serverless API proxy**, demonstrating a robust, full-stack architecture.

---

## ✨ Key Features

* **AI-Powered Search (Groq):** Utilizes the Groq AI model to understand natural language prompts and generate curated, relevant movie lists.
* **Secure User Authentication:** Full-featured authentication (Sign In, Sign Up, Sign Out) powered by **Firebase Auth** with protected routes.
* **Efficient State Management:** Uses **Redux Toolkit** to manage application-wide state, including user data, movie lists, and AI results.
* **Dynamic Movie Trailers:** Fetches and displays movie trailers on the main browse page for an immersive, Netflix-like experience.
* **Multi-Language Support:** (Feature) Built with a scalable structure to easily add multi-language support (e.g., using i18n).
* **Optimized Performance:** Implements **Lazy Loading** for React components to reduce initial bundle size and improve load times.
* **Curated Carousels:** Displays multiple categories (Now Playing, Popular, Top Rated) fetched dynamically from the TMDB API.
* **Fully Responsive Design:** A mobile-first, responsive UI built with **Tailwind CSS** that looks and works great on all devices.

---

## 🛠️ Tech Stack & Tools

* **Frontend:** React, React Router, Redux Toolkit, Tailwind CSS
* **Backend (Serverless):** Vercel Serverless Functions (Node.js)
* **Authentication:** Firebase Auth
* **APIs:** Groq AI (for recommendations), TMDB (for movie data)
* **Deployment:** Vercel

---

## 💡 Technical Highlights & Problem-Solving

This project demonstrates robust, secure, and efficient full-stack development.

### 1. Secure Serverless API Proxy

* **Problem:** The TMDB API is blocked in some regions, and both TMDB and Groq API keys must be kept secret. Exposing them in a React app is a major security risk.
* **Solution:** I engineered a secure API proxy using **Vercel Serverless Functions**.
    * The React client *never* talks to TMDB or Groq directly.
    * All requests are sent to internal API endpoints (`/api/tmdb`, `/api/groq`).
    * The serverless function (running on Vercel's backend) securely reads the `TMDB_API_KEY` and `GROQ_API_KEY` from environment variables, calls the external API, and returns the data to the client.
* **Benefit:** This architecture **(1)** Bypasses regional API blocks, **(2)** Secures all secret API keys, and **(3)** Demonstrates a professional full-stack, "backend-for-frontend" pattern.

### 2. State-Driven AI Recommendation Flow

The AI search feature uses a clean, state-driven flow orchestrated by Redux:
1.  User submits a prompt (e.g., "5 sad movies about dogs").
2.  The prompt is sent to the `/api/groq` proxy.
3.  Groq's AI model generates a JSON object of 5 movie titles.
4.  The React app receives this JSON, parses it, and then uses a `Promise.all` call to fetch details for all 5 movies *in parallel* using the `/api/tmdb` proxy.
5.  The final, rich movie data is stored in the Redux `gptSlice` and instantly rendered on the UI.

### 3. Code Optimization & Structure

* **Custom Hooks:** The app is built with several custom React hooks (e.g., `useAddData`, `useGetMovieRecommendations`) to encapsulate logic, promote reusability, and keep components clean.
* **Lazy Loading:** React components are lazy-loaded to split the code into smaller chunks, leading to a significantly faster initial page load.
* **Monorepo-Style Structure:** The project is structured with the React app (`/my-project/src`) and serverless functions (`/my-project/api`) in the same directory, which Vercel is optimized to build and deploy seamlessly.

---

## 📂 Project Structure
You are right, a <code> block can look messy and the spacing can be off. A clean, indented list is much more professional and easier to read.

Here is a cleaner, better-formatted version for your README.md. Just replace the 📂 Project Structure section with this:

📂 Project Structure

my-project/
│
├── api/                       # Serverless API routes (Vercel Functions)
│   ├── tmdb.js                # Proxy → Secure TMDB API calls
│   └── groq.js                # Proxy → Secure Groq AI API calls
│
├── public/                    # Static assets (favicon, images, etc.)
│
├── src/                       # Main React application
│   │
│   ├── components/            # Reusable UI components
│   │
│   ├── hooks/                 # Custom React hooks (e.g., useAddData)
│   │
│   ├── utils/                 # Core configuration and helpers
│   │   ├── appStore.js        # Redux store setup
│   │   ├── browseSlice.js     # Redux slice → Movie sections
│   │   ├── gptSlice.js        # Redux slice → AI search results
│   │   └── firebase.js        # Firebase authentication setup
│   │
│   └── App.js                 # Root App component + Routing
│
├── package.json               # Dependencies, scripts, metadata
└── vercel.json                # Vercel config (React Router rewrites)
