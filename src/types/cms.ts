import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author: string;
  tags?: string[];
  publishedAt: string;
  excerpt?: string;
  coverImage?: SanityImage | null;
  body?: PortableTextBlock[];
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  client: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  metrics?: { label: string; value: string }[];
  publishedAt?: string;
  coverImage?: SanityImage | null;
}
