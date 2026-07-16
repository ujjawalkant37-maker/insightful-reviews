export type AIRequest = {
  prompt: string;
};

export type AIResponse = {
  response: string;
};

export async function askAI(
  prompt: string
): Promise<string> {
  const res = await fetch("/api/ai", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      prompt,
    } satisfies AIRequest),
  });

  const data = (await res.json()) as
    | AIResponse
    | { error: string };

  if (!res.ok) {
    throw new Error(
      "error" in data
        ? data.error
        : "AI request failed."
    );
  }

  return (data as AIResponse).response;
}

/*
--------------------------------------------------------
Website AI Functions
--------------------------------------------------------

Every AI feature in the website should call askAI()

Examples:

AI Summary

await askAI(
`Summarize Samsung Galaxy S25 Ultra in 150 words.`
);

--------------------------------------------------------

Buy / Wait / Avoid

await askAI(
`Should I buy Samsung Galaxy S25 Ultra?
Return BUY / WAIT / AVOID with reasons.`
);

--------------------------------------------------------

Product Comparison

await askAI(
`Compare iPhone 16 Pro and Galaxy S25 Ultra.`
);

--------------------------------------------------------

Review Writer

await askAI(
`Improve this review:
Excellent phone but expensive.`
);

--------------------------------------------------------

Fake Review Detection

await askAI(
`Determine whether this review looks fake:
"${review}"
`
);

--------------------------------------------------------

Chat Assistant

await askAI(userQuestion);

--------------------------------------------------------
*/