"use client";

import { useQueryState } from "nuqs";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types/cms";
import { getCoverImageUrl } from "@/lib/sanity/image";
import { postCoverGradients } from "@/lib/sanity/mock-data";
import { formatDateShort } from "@/lib/format";

interface BlogGridProps {
  posts: BlogPost[];
  defaultTag?: string;
}

function PostCover({ post }: { post: BlogPost }) {
  const imageUrl = getCoverImageUrl(post.coverImage);
  const gradient = postCoverGradients[post.slug] ?? "from-accent/20 to-surface";

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-105`}
    >
      <span className="text-5xl font-bold text-white/15">{post.title.charAt(0)}</span>
    </div>
  );
}

export default function BlogGrid({ posts, defaultTag = "" }: BlogGridProps) {
  const [activeTag] = useQueryState("tag", { defaultValue: defaultTag });

  const filtered = activeTag
    ? posts.filter((p) => p.tags?.includes(activeTag))
    : posts;

  if (filtered.length === 0) {
    return (
      <p className="text-center text-muted">No posts found for this tag.</p>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filtered.map((post) => (
        <article key={post._id} className="group">
          <Link href={`/blog/${post.slug}`} data-cursor="link">
            <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface-elevated">
              <PostCover post={post} />
            </div>
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-lg font-semibold text-white transition-colors group-hover:text-accent">
              {post.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted">
              <span>{post.author}</span>
              <span>&middot;</span>
              <time dateTime={post.publishedAt}>
                {formatDateShort(post.publishedAt)}
              </time>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
