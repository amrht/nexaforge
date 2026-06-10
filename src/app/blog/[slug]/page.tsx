import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getBlogPost, getBlogPosts } from "@/lib/cms";
import PortableTextRenderer from "@/components/cms/PortableTextRenderer";
import { getCoverImageUrl } from "@/lib/sanity/image";
import { mockBlogBodies, postCoverGradients } from "@/lib/sanity/mock-data";
import type { PortableTextBlock } from "@portabletext/types";
import { formatDateLong } from "@/lib/format";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

const fallbackBody: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "fallback",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "s1",
        text: "This article is being prepared. Check back soon for the full story.",
        marks: [],
      },
    ],
  },
];

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const body = post.body ?? mockBlogBodies[slug] ?? fallbackBody;
  const coverUrl = getCoverImageUrl(post.coverImage, 1200, 630);
  const gradient = postCoverGradients[slug] ?? "from-accent/20 to-surface";

  return (
    <article className="px-6 py-32 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl font-semibold text-white md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-3 text-sm text-muted">
          <span>{post.author}</span>
          <span>&middot;</span>
          <time dateTime={post.publishedAt}>
            {formatDateLong(post.publishedAt)}
          </time>
        </div>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          ) : (
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient}`}
            >
              <span className="text-8xl font-bold text-white/10">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="mt-12">
          <PortableTextRenderer value={body} />
        </div>
      </div>
    </article>
  );
}
