import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY?.trim();
export const AI_MODEL = process.env.OPENAI_MODEL?.trim() || "gpt-5-mini";
export const openai = apiKey ? new OpenAI({ apiKey }) : null;

function fallbackResponse(prompt: string) {
  const value = prompt.toLowerCase();
  if (/(buy|purchase|should i|worth it)/.test(value)) {
    return "AI service is temporarily unavailable. Use the displayed price, rating, Trust Score, review evidence, warranty and alternatives before deciding. A live AI verdict will appear when the configured AI provider has available quota.";
  }
  if (/(review|summar|opinion)/.test(value)) {
    return "Review intelligence is currently using source-attributed evidence only. Connect an AI provider with available quota to generate a deeper semantic summary; the underlying reviews remain available without AI.";
  }
  return "The AI provider is currently unavailable. Your website remains operational; reconnect AI quota to enable generated responses.";
}

export async function generateAIResponse(prompt: string) {
  if (!openai) return fallbackResponse(prompt);
  try {
    const response = await openai.responses.create({ model: AI_MODEL, input: prompt });
    return response.output_text ?? fallbackResponse(prompt);
  } catch (error) {
    console.error("OpenAI Error:", error);
    return fallbackResponse(prompt);
  }
}

export async function generateStructuredAIResponse(systemPrompt: string, userPrompt: string) {
  if (!openai) return fallbackResponse(userPrompt);
  try {
    const response = await openai.responses.create({
      model: AI_MODEL,
      input: [
        { role: "system", content: [{ type: "input_text", text: systemPrompt }] },
        { role: "user", content: [{ type: "input_text", text: userPrompt }] },
      ],
    });
    return response.output_text ?? fallbackResponse(userPrompt);
  } catch (error) {
    console.error("OpenAI Structured Error:", error);
    return fallbackResponse(userPrompt);
  }
}
