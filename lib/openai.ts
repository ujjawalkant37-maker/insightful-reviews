import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing OPENAI_API_KEY in .env.local"
  );
}

export const openai = new OpenAI({
  apiKey,
});

export const AI_MODEL = "gpt-5-mini";

export async function generateAIResponse(
  prompt: string
) {
  try {
    const response = await openai.responses.create({
      model: AI_MODEL,

      input: prompt,

      temperature: 0.4,
    });

    return (
      response.output_text ??
      "Unable to generate AI response."
    );
  } catch (error) {
    console.error(
      "OpenAI Error:",
      error
    );

    throw new Error(
      "Failed to generate AI response."
    );
  }
}

export async function generateStructuredAIResponse(
  systemPrompt: string,
  userPrompt: string
) {
  try {
    const response = await openai.responses.create({
      model: AI_MODEL,

      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: systemPrompt,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: userPrompt,
            },
          ],
        },
      ],

      temperature: 0.3,
    });

    return (
      response.output_text ??
      "No AI response."
    );
  } catch (error) {
    console.error(
      "OpenAI Structured Error:",
      error
    );

    throw error;
  }
}