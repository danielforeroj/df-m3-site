import { GoogleGenAI } from "@google/genai";

// Use a variable to hold the initialized client.
// This avoids re-initializing on every call.
let ai: GoogleGenAI | null = null;

/**
 * Lazily initializes and returns the GoogleGenAI client.
 * Throws an error if the API key is not available.
 */
function getAiClient(): GoogleGenAI {
  if (ai) {
    return ai;
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("Gemini API key not found. Please set the API_KEY environment variable.");
    throw new Error("API key is not configured. AI features are disabled.");
  }

  ai = new GoogleGenAI({ apiKey });
  return ai;
}

export async function summarizeText(textToSummarize: string): Promise<string> {
  try {
    const client = getAiClient(); // This will throw if no key
    const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Summarize the following content in a concise paragraph:\n\n---\n\n${textToSummarize}`
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Re-throw the error to be caught by the UI component.
    if (error instanceof Error) {
        throw new Error(`Failed to generate summary: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while communicating with the AI service.");
  }
}