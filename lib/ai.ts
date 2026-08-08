export type AIRequest = {
  prompt: string;
  systemPrompt?: string;
};

export type AIResponse = {
  success?: boolean;
  response?: string;
  error?: string;
};

export async function askAI(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  const res = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      ...(systemPrompt ? { systemPrompt } : {}),
    } satisfies AIRequest),
  });

  const contentType = res.headers.get("content-type") ?? "";

  let data: AIResponse;

  if (contentType.includes("application/json")) {
    data = (await res.json()) as AIResponse;
  } else {
    const text = await res.text();
    throw new Error(
      `AI API returned a non-JSON response (${res.status}). ${
        text.slice(0, 200) || "No response body."
      }`
    );
  }

  if (!res.ok || data.success === false || data.error) {
    throw new Error(data.error ?? "AI request failed.");
  }

  if (!data.response) {
    throw new Error("AI API returned an empty response.");
  }

  return data.response;
}
