// This is your NEW code for /api/groq.js

import Groq from 'groq-sdk';

// Initialize Groq securely on the server
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Reads the *secure* key from Vercel
});

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get the entire request body sent from the React app
  // This will include { messages, model, response_format, ... }
  const requestBody = request.body;

  if (!requestBody || !requestBody.messages) {
    return response.status(400).json({ error: 'Missing messages in request body' });
  }

  try {
    // Pass the entire request body from the client to the Groq API
    const chatCompletion = await groq.chat.completions.create(requestBody);

    // Send Groq's response (just the first 'choice' object) back
    return response.status(200).json(chatCompletion.choices[0]);

  } catch (error) {
    console.error('Error calling Groq API:', error);
    return response.status(500).json({ error: 'Error processing your request' });
  }
}