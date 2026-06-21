export interface ArticleFAQ {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  tags: string[];
  content: string;
  faqs: ArticleFAQ[];
}
