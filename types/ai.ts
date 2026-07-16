export type AIVerdict =
  | "BUY"
  | "WAIT"
  | "AVOID";

export interface AIReviewSummary {
  summary: string;

  verdict: AIVerdict;

  confidence: number;

  trustScore: number;

  strengths: string[];

  weaknesses: string[];

  bestFor: string[];

  notRecommendedFor: string[];

  finalOpinion: string;
}

export interface AICompareResult {
  winner: string;

  verdict: AIVerdict;

  reason: string;

  comparison: {
    category: string;

    winner: string;

    explanation: string;
  }[];
}

export interface AIReviewWriter {
  title: string;

  review: string;

  pros: string[];

  cons: string[];

  rating: number;
}

export interface AIQuestionAnswer {
  question: string;

  answer: string;
}

export interface AIRecommendation {
  productName: string;

  score: number;

  verdict: AIVerdict;

  reason: string;
}

export interface AIFakeReviewAnalysis {
  probability: number;

  verdict:
    | "GENUINE"
    | "SUSPICIOUS"
    | "LIKELY FAKE";

  explanation: string;
}

export interface AIPriceAdvice {
  currentPrice: string;

  recommendation:
    | "BUY NOW"
    | "WAIT FOR PRICE DROP";

  expectedPrice?: string;

  reason: string;
}