
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export async function summarizeText(textToSummarize: string): Promise<string> {
  if (!apiKey) {
    throw new Error("API key is not configured. AI features are disabled.");
  }
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Summarize the following content in a concise paragraph:\n\n---\n\n${textToSummarize}`
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Failed to generate summary. Error: ${error.message}`;
    }
    throw new Error("An unexpected error occurred while communicating with the AI service.");
  }
}
