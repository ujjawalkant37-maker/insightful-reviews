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
  summary: string;
  specs?: Record<string, string>;
  images?: string[];
};
