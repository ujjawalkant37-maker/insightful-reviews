"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  Bot,
  User,
  Send,
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Download,
  Mic,
  Moon,
  Sun,
  Sparkles,
  ShieldCheck,
  Loader2,
  MessageSquare,
  Trash2,
  Check,
} from "lucide-react";

import { askAI } from "@/lib/ai";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type Role = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
  liked?: boolean | null;
}

interface SuggestedPrompt {
  title: string;
  prompt: string;
}

interface ScoreCard {
  label: string;
  value: number;
  description: string;
}

interface ProductContext {
  name: string;
  category: string;
  summary: string;
  highlights: string[];
}

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition;
    SpeechRecognition?: new () => SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onstart: (() => void) | null;
    onend: (() => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
  }

  interface SpeechRecognitionEvent {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionErrorEvent {
    error: string;
  }

  interface SpeechRecognitionResultList {
    length: number;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    isFinal: boolean;
    length: number;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const PRODUCT_CONTEXT: ProductContext = {
  name: "AI Copilot",
  category: "Customer Intelligence",
  summary:
    "An AI assistant that answers product questions while keeping responses concise, contextual, and trustworthy.",
  highlights: [
    "Context-aware responses",
    "Trust & AI quality indicators",
    "Conversation export",
    "Speech-to-text input",
  ],
};

const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    title: "Overview",
    prompt: "Give me a concise overview of this product.",
  },
  {
    title: "Benefits",
    prompt: "What are the main customer benefits?",
  },
  {
    title: "Comparison",
    prompt: "Compare this product with common alternatives.",
  },
  {
    title: "Risks",
    prompt: "What limitations should customers know?",
  },
];

const INITIAL_GREETING: ChatMessage = {
  id: crypto.randomUUID(),
  role: "assistant",
  createdAt: Date.now(),
  content:
    "👋 Hi! I'm your AI Copilot. Ask me anything about this product, request comparisons, summaries, recommendations, or technical explanations.",
};

/* -------------------------------------------------------------------------- */
/*                                 Utilities                                  */
/* -------------------------------------------------------------------------- */

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));

const randomId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

const escapeHtml = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const copyToClipboard = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

const exportConversation = (messages: ChatMessage[]) => {
  const text = messages
    .map(
      (m) =>
        `[${new Date(m.createdAt).toLocaleString()}]\n${m.role.toUpperCase()}\n${
          m.content
        }\n`
    )
    .join("\n--------------------------------------\n\n");

  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "conversation.txt";
  anchor.click();

  URL.revokeObjectURL(url);
};

/* -------------------------------------------------------------------------- */
/*                            Markdown (No Library)                           */
/* -------------------------------------------------------------------------- */

function formatInline(text: string) {
  let value = escapeHtml(text);

  value = value.replace(
    /\*\*(.+?)\*\*/g,
    "<strong>$1</strong>"
  );

  value = value.replace(
    /\*(.+?)\*/g,
    "<em>$1</em>"
  );

  value = value.replace(
    /`([^`]+?)`/g,
    "<code class='rounded bg-black/10 dark:bg-white/10 px-1 py-0.5 text-[0.9em]'>$1</code>"
  );

  value = value.replace(
    /\[(.+?)\]\((https?:\/\/[^\s]+)\)/g,
    "<a href='$2' target='_blank' rel='noopener noreferrer' class='text-blue-600 underline'>$1</a>"
  );

  return value;
}

function renderMarkdown(markdown: string) {
  const lines = markdown.split("\n");

  const html: string[] = [];
  let inList = false;

  for (const raw of lines) {
    const line = raw.trim();

    if (line.startsWith("- ")) {
      if (!inList) {
        html.push("<ul class='list-disc pl-5 space-y-1'>");
        inList = true;
      }

      html.push(`<li>${formatInline(line.slice(2))}</li>`);
      continue;
    }

    if (inList) {
      html.push("</ul>");
      inList = false;
    }

    if (!line) {
      html.push("<br/>");
      continue;
    }

    if (line.startsWith("### ")) {
      html.push(
        `<h3 class="font-semibold mt-3 mb-1">${formatInline(
          line.slice(4)
        )}</h3>`
      );
      continue;
    }

    if (line.startsWith("## ")) {
      html.push(
        `<h2 class="font-bold text-lg mt-3 mb-2">${formatInline(
          line.slice(3)
        )}</h2>`
      );
      continue;
    }

    if (line.startsWith("# ")) {
      html.push(
        `<h1 class="font-bold text-xl mt-3 mb-2">${formatInline(
          line.slice(2)
        )}</h1>`
      );
      continue;
    }

    html.push(`<p>${formatInline(line)}</p>`);
  }

  if (inList) {
    html.push("</ul>");
  }

  return html.join("");
}

/* -------------------------------------------------------------------------- */
/*                               Score Helpers                                */
/* -------------------------------------------------------------------------- */

function calculateAIScore(text: string): number {
  let score = 58;

  score += Math.min(text.length / 18, 22);

  if (text.includes("•") || text.includes("-")) score += 4;
  if (text.includes("because")) score += 3;
  if (text.includes("summary")) score += 3;
  if (text.length > 350) score += 5;

  return clamp(Math.round(score));
}

function calculateTrustScore(text: string): number {
  let score = 65;

  if (/maybe|might|could/i.test(text)) score += 4;
  if (/source|reference|evidence/i.test(text)) score += 6;
  if (text.length > 300) score += 5;
  if (text.includes("http")) score += 3;

  return clamp(Math.round(score));
}

function buildScoreCards(response: string): ScoreCard[] {
  return [
    {
      label: "AI Score",
      value: calculateAIScore(response),
      description: "Estimated answer quality",
    },
    {
      label: "Trust Score",
      value: calculateTrustScore(response),
      description: "Estimated confidence",
    },
  ];
}

/* -------------------------------------------------------------------------- */
/*                               Component Starts                             */
/* -------------------------------------------------------------------------- */

export default function AICopilot() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    INITIAL_GREETING,
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
    const [lastPrompt, setLastPrompt] = useState("");
  const [lastResponse, setLastResponse] = useState("");
  const [scores, setScores] = useState<ScoreCard[]>(() =>
    buildScoreCards(INITIAL_GREETING.content)
  );

  /* ------------------------------------------------------------------------ */
  /*                                Derived Data                              */
  /* ------------------------------------------------------------------------ */

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading]
  );

  const themeClasses = useMemo(
    () =>
      darkMode
        ? "dark bg-neutral-950 text-neutral-100"
        : "bg-neutral-50 text-neutral-900",
    [darkMode]
  );

  /* ------------------------------------------------------------------------ */
  /*                              Auto Scroll                                 */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, typing]);

  /* ------------------------------------------------------------------------ */
  /*                            Theme Persistence                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem("ai-theme")
        : null;

    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "ai-theme",
        darkMode ? "dark" : "light"
      );
    }
  }, [darkMode]);

  /* ------------------------------------------------------------------------ */
  /*                           Speech Recognition                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (typeof window === "undefined") return;

    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!Recognition) return;

    const recognition = new Recognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
      setError("");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event) => {
      setListening(false);
      setError(`Speech recognition error: ${event.error}`);
    };

    recognition.onresult = (event) => {
      let transcript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i += 1
      ) {
        transcript += event.results[i][0].transcript;
      }

      setInput(transcript);
    };

    recognitionRef.current = recognition;

    return () => recognition.abort();
  }, []);

  const toggleListening = useCallback(() => {
    const recognition = recognitionRef.current;

    if (!recognition) {
      setError("Speech recognition is not supported.");
      return;
    }

    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  }, [listening]);

  /* ------------------------------------------------------------------------ */
  /*                               Chat Actions                               */
  /* ------------------------------------------------------------------------ */

  const appendMessage = useCallback(
    (message: ChatMessage) => {
      setMessages((previous) => [...previous, message]);
    },
    []
  );

  const sendPrompt = useCallback(
    async (prompt: string) => {
      const value = prompt.trim();

      if (!value || loading) return;

      setError("");
      setTyping(true);
      setLoading(true);

      setLastPrompt(value);

      const userMessage: ChatMessage = {
        id: randomId(),
        role: "user",
        content: value,
        createdAt: Date.now(),
      };

      appendMessage(userMessage);

      try {
        const contextualPrompt = `
Product:
${PRODUCT_CONTEXT.name}

Category:
${PRODUCT_CONTEXT.category}

Summary:
${PRODUCT_CONTEXT.summary}

Highlights:
${PRODUCT_CONTEXT.highlights.join(", ")}

User Question:
${value}
`.trim();

        const response = await askAI(contextualPrompt);

        const assistantMessage: ChatMessage = {
          id: randomId(),
          role: "assistant",
          content: response,
          createdAt: Date.now(),
        };

        appendMessage(assistantMessage);

        setLastResponse(response);
        setScores(buildScoreCards(response));
        setInput("");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while contacting the AI."
        );
      } finally {
        setTyping(false);
        setLoading(false);
      }
    },
    [appendMessage, loading]
  );

  const regenerateResponse = useCallback(async () => {
    if (!lastPrompt || loading) return;

    await sendPrompt(lastPrompt);
  }, [lastPrompt, loading, sendPrompt]);

  const handleCopy = useCallback(async (message: ChatMessage) => {
    try {
      await copyToClipboard(message.content);

      setCopiedId(message.id);

      window.setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch {
      setError("Unable to copy message.");
    }
  }, []);

  const rateMessage = useCallback(
    (id: string, liked: boolean) => {
      setMessages((previous) =>
        previous.map((message) =>
          message.id === id
            ? {
                ...message,
                liked,
              }
            : message
        )
      );
    },
    []
  );

  const clearConversation = useCallback(() => {
    setMessages([INITIAL_GREETING]);
    setScores(buildScoreCards(INITIAL_GREETING.content));
    setLastPrompt("");
    setLastResponse("");
    setError("");
  }, []);

  /* ------------------------------------------------------------------------ */
  /*                              Keyboard Send                               */
  /* ------------------------------------------------------------------------ */

  const onComposerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        void sendPrompt(input);
      }
    },
    [input, sendPrompt]
  );

  const formattedContext = useMemo(
    () =>
      [
        PRODUCT_CONTEXT.name,
        PRODUCT_CONTEXT.category,
        PRODUCT_CONTEXT.summary,
        PRODUCT_CONTEXT.highlights.join(", "),
      ].join(" • "),
    []
  );

  const latestAssistantMessage = useMemo(
    () =>
      [...messages]
        .reverse()
        .find((message) => message.role === "assistant"),
    [messages]
  );

  useEffect(() => {
    if (latestAssistantMessage) {
      setLastResponse(latestAssistantMessage.content);
    }
  }, [latestAssistantMessage]);

  return (
        <div
      className={`${themeClasses} flex h-[100dvh] w-full flex-col transition-colors duration-300`}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <header className="sticky top-0 z-20 border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-neutral-950/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2 text-white shadow">
              <Sparkles className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                AI Copilot
              </h1>

              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Product-aware AI assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Export conversation"
              onClick={() => exportConversation(messages)}
              className="rounded-lg border border-black/10 p-2 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
            >
              <Download className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Clear conversation"
              onClick={clearConversation}
              className="rounded-lg border border-black/10 p-2 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Toggle theme"
              onClick={() => setDarkMode((v) => !v)}
              className="rounded-lg border border-black/10 p-2 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main Layout                                                        */}
      {/* ------------------------------------------------------------------ */}

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 overflow-hidden p-4 lg:flex-row">
        {/* -------------------------------------------------------------- */}
        {/* Sidebar                                                       */}
        {/* -------------------------------------------------------------- */}

        <aside className="flex w-full flex-col gap-4 lg:max-w-sm">
          {/* Product Context */}

          <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
              <h2 className="font-semibold">Product Context</h2>
            </div>

            <p className="font-medium">{PRODUCT_CONTEXT.name}</p>

            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              {PRODUCT_CONTEXT.category}
            </p>

            <p className="mt-4 text-sm leading-6 text-neutral-600 dark:text-neutral-300">
              {PRODUCT_CONTEXT.summary}
            </p>

            <ul className="mt-4 space-y-2">
              {PRODUCT_CONTEXT.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm"
                >
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl bg-neutral-100 p-3 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">
              {formattedContext}
            </div>
          </section>

          {/* AI Scores */}

          <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <h2 className="font-semibold">Quality Indicators</h2>
            </div>

            <div className="space-y-4">
              {scores.map((score) => (
                <article
                  key={score.label}
                  className="rounded-xl border border-black/10 p-4 dark:border-white/10"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {score.label}
                    </span>

                    <span className="text-lg font-bold">
                      {score.value}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{
                        width: `${score.value}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    {score.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Suggested Prompts */}

          <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-900">
            <div className="mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-violet-500" />
              <h2 className="font-semibold">Suggested Prompts</h2>
            </div>

            <div className="flex flex-col gap-3">
              {SUGGESTED_PROMPTS.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setInput(item.prompt);
                    textareaRef.current?.focus();
                  }}
                  className="rounded-xl border border-black/10 p-3 text-left transition hover:bg-neutral-100 disabled:opacity-50 dark:border-white/10 dark:hover:bg-neutral-800"
                >
                  <div className="font-medium">
                    {item.title}
                  </div>

                  <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {item.prompt}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* -------------------------------------------------------------- */}
        {/* Chat Area (continues in Part IV)                              */}
        {/* -------------------------------------------------------------- */}

        <main className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-900">
        </main>
                  {/* -------------------------------------------------------------- */}
          {/* Chat Header                                                    */}
          {/* -------------------------------------------------------------- */}

          <div className="border-b border-black/10 px-5 py-4 dark:border-white/10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-600 p-2 text-white">
                  <Bot className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold">Conversation</h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Ask anything about the product.
                  </p>
                </div>
              </div>

              {loading && (
                <div
                  className="flex items-center gap-2 text-sm text-neutral-500"
                  aria-live="polite"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              )}
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Messages                                                       */}
          {/* -------------------------------------------------------------- */}

          <div
            className="flex-1 overflow-y-auto px-5 py-6"
            aria-live="polite"
            aria-label="Conversation History"
          >
            <div className="space-y-6">
              {messages.map((message) => {
                const isAssistant = message.role === "assistant";

                return (
                  <article
                    key={message.id}
                    className={`flex gap-3 ${
                      isAssistant ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isAssistant && (
                      <div className="mt-1 rounded-full bg-blue-600 p-2 text-white">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl border px-4 py-3 shadow-sm transition-all ${
                        isAssistant
                          ? "border-black/10 bg-white dark:border-white/10 dark:bg-neutral-800"
                          : "border-blue-600 bg-blue-600 text-white"
                      }`}
                    >
                      <div
                        className={`prose prose-sm max-w-none dark:prose-invert ${
                          isAssistant ? "" : "text-white"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdown(message.content),
                        }}
                      />

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs ${
                            isAssistant
                              ? "text-neutral-500 dark:text-neutral-400"
                              : "text-blue-100"
                          }`}
                        >
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        <div className="ml-auto flex items-center gap-1">
                          <button
                            type="button"
                            aria-label="Copy message"
                            onClick={() => handleCopy(message)}
                            className="rounded-lg p-2 transition hover:bg-black/5 dark:hover:bg-white/10"
                          >
                            {copiedId === message.id ? (
                              <Check className="h-4 w-4 text-emerald-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>

                          {isAssistant && (
                            <>
                              <button
                                type="button"
                                aria-label="Regenerate response"
                                onClick={regenerateResponse}
                                disabled={loading}
                                className="rounded-lg p-2 transition hover:bg-black/5 disabled:opacity-50 dark:hover:bg-white/10"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </button>

                              <button
                                type="button"
                                aria-label="Like response"
                                onClick={() => rateMessage(message.id, true)}
                                className={`rounded-lg p-2 transition ${
                                  message.liked === true
                                    ? "bg-emerald-500 text-white"
                                    : "hover:bg-black/5 dark:hover:bg-white/10"
                                }`}
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </button>

                              <button
                                type="button"
                                aria-label="Dislike response"
                                onClick={() => rateMessage(message.id, false)}
                                className={`rounded-lg p-2 transition ${
                                  message.liked === false
                                    ? "bg-red-500 text-white"
                                    : "hover:bg-black/5 dark:hover:bg-white/10"
                                }`}
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {!isAssistant && (
                      <div className="mt-1 rounded-full bg-neutral-800 p-2 text-white dark:bg-neutral-700">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </article>
                );
              })}

              {/* ---------------------------------------------------------- */}
              {/* Typing Indicator                                           */}
              {/* ---------------------------------------------------------- */}

              {typing && (
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-600 p-2 text-white">
                    <Bot className="h-4 w-4" />
                  </div>

                  <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm dark:border-white/10 dark:bg-neutral-800">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        AI is typing...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Error Banner                                                   */}
          {/* -------------------------------------------------------------- */}

          {error && (
            <div
              className="border-t border-red-300 bg-red-50 px-5 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Composer begins in Part V */}
                    {/* -------------------------------------------------------------- */}
          {/* Composer                                                       */}
          {/* -------------------------------------------------------------- */}

          <div className="border-t border-black/10 bg-white p-4 dark:border-white/10 dark:bg-neutral-900">
            <div className="flex flex-col gap-3">
              <label htmlFor="ai-prompt" className="sr-only">
                Ask AI
              </label>

              <textarea
                id="ai-prompt"
                ref={textareaRef}
                value={input}
                rows={4}
                disabled={loading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onComposerKeyDown}
                placeholder="Ask anything about this product..."
                aria-label="AI Prompt"
                className="w-full resize-none rounded-2xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none ring-0 transition focus:border-blue-500 dark:border-white/10"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleListening}
                    aria-label={
                      listening
                        ? "Stop speech recognition"
                        : "Start speech recognition"
                    }
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                      listening
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-black/10 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                    }`}
                  >
                    <Mic
                      className={`h-4 w-4 ${
                        listening ? "animate-pulse" : ""
                      }`}
                    />

                    {listening ? "Listening..." : "Voice"}
                  </button>

                  <button
                    type="button"
                    onClick={() => exportConversation(messages)}
                    aria-label="Export conversation"
                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </button>

                  <button
                    type="button"
                    onClick={clearConversation}
                    aria-label="Clear conversation"
                    className="inline-flex items-center gap-2 rounded-xl border border-black/10 px-4 py-2 text-sm font-medium transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </button>
                </div>

                <button
                  type="button"
                  disabled={!canSend}
                  onClick={() => void sendPrompt(input)}
                  aria-label="Send message"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <span>
                  Press <kbd className="rounded bg-black/10 px-1 py-0.5 dark:bg-white/10">Enter</kbd> to send,
                  <kbd className="ml-1 rounded bg-black/10 px-1 py-0.5 dark:bg-white/10">
                    Shift + Enter
                  </kbd>{" "}
                  for a new line.
                </span>

                <span>{input.length} characters</span>
              </div>
            </div>
          </div>
        </main>
      </div>
            {/* ------------------------------------------------------------------ */}
      {/* Accessibility Live Region                                          */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {typing
          ? "AI is generating a response."
          : loading
          ? "Sending message."
          : error
          ? `Error: ${error}`
          : "Ready."}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                             */}
      {/* ------------------------------------------------------------------ */}

      <footer className="border-t border-black/10 bg-white/80 px-4 py-3 text-center text-xs text-neutral-500 dark:border-white/10 dark:bg-neutral-950/80 dark:text-neutral-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <span>
            AI Copilot • Product-aware assistant powered by <strong>askAI()</strong>
          </span>

          <span>
            {messages.length} message{messages.length === 1 ? "" : "s"} •{" "}
            {scores.map((s) => `${s.label}: ${s.value}%`).join(" • ")}
          </span>
        </div>
      </footer>
    </div>
  );
}
