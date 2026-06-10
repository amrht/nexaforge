import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/cms";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0b",
          color: "#f5f5f5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: "#6366f1",
            marginBottom: 24,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          NexaForge Blog
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          {post?.title || "Engineering Insights"}
        </div>
        {post?.author && (
          <div style={{ fontSize: 24, color: "#a1a1aa", marginTop: 32 }}>
            {post.author}
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
