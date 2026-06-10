import { sanityClient, isSanityConfigured } from "@/lib/sanity/client";
import {
  blogPostsQuery,
  blogPostBySlugQuery,
  caseStudiesQuery,
  caseStudyBySlugQuery,
} from "@/lib/sanity/queries";
import { mockBlogPosts, mockCaseStudies } from "@/lib/sanity/mock-data";
import type { BlogPost, CaseStudy } from "@/types/cms";

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured || !sanityClient) {
    return mockBlogPosts;
  }
  try {
    return await sanityClient.fetch(blogPostsQuery);
  } catch {
    return mockBlogPosts;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured || !sanityClient) {
    return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  }
  try {
    return await sanityClient.fetch(blogPostBySlugQuery, { slug });
  } catch {
    return mockBlogPosts.find((p) => p.slug === slug) ?? null;
  }
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!isSanityConfigured || !sanityClient) {
    return mockCaseStudies;
  }
  try {
    return await sanityClient.fetch(caseStudiesQuery);
  } catch {
    return mockCaseStudies;
  }
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  if (!isSanityConfigured || !sanityClient) {
    return mockCaseStudies.find((c) => c.slug === slug) ?? null;
  }
  try {
    return await sanityClient.fetch(caseStudyBySlugQuery, { slug });
  } catch {
    return mockCaseStudies.find((c) => c.slug === slug) ?? null;
  }
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}
