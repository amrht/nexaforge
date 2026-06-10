import type { Metadata } from "next";
import { Suspense } from "react";
import { getBlogPosts, getAllTags } from "@/lib/cms";
import BlogFilter from "@/components/blog/BlogFilter";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on AI, engineering, and enterprise transformation from the NexaForge team.",
};

export const revalidate = 60;

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag: defaultTag = "" } = await searchParams;
  const posts = await getBlogPosts();
  const tags = getAllTags(posts);

  return (
    <div className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Insights
        </span>
        <h1 className="mt-4 mb-4 text-4xl font-semibold text-white md:text-5xl">
          Engineering perspectives
        </h1>
        <p className="mb-12 max-w-2xl text-muted">
          Deep dives on AI governance, legacy modernization, and building
          production-grade systems at enterprise scale.
        </p>

        <Suspense fallback={<div className="mb-12 h-10 animate-pulse rounded-full bg-surface-elevated" />}>
          <BlogFilter tags={tags} defaultTag={defaultTag} />
        </Suspense>
        <Suspense fallback={<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface-elevated" />
          ))}
        </div>}>
          <BlogGrid posts={posts} defaultTag={defaultTag} />
        </Suspense>
      </div>
    </div>
  );
}
