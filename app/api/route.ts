import { NextRequest, NextResponse } from "next/server";

import {
  generateStructuredAIResponse,
} from "@/lib/openai";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      systemPrompt,
      prompt,
    } = body;

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          error: "Prompt is required.",
        },
        {
          status: 400,
        }
      );
    }

    const result =
      await generateStructuredAIResponse(
        systemPrompt ??
          "You are an expert product reviewer.",
        prompt
      );

    return NextResponse.json({
      success: true,
      response: result,
    });
  } catch (error) {
    console.error(
      "AI Route Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to generate AI response.",
      },
      {
        status: 500,
      }
    );
  }
}