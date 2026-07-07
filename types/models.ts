export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  price: string;
  rating: number; // 0-5
  aiScore: number;
  summary: string;
  specs?: Record<string, string>;
  pros?: string[];
  cons?: string[];
  expertSummary?: string;
  buyUrl?: string;
  images?: string[];
};
