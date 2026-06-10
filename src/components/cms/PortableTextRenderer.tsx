import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ""}
            width={1200}
            height={675}
            className="rounded-xl"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    codeBlock: ({ value }) => (
      <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-surface-elevated p-4">
        <code className="text-sm text-white/80">{value.code}</code>
      </pre>
    ),
    callout: ({ value }) => (
      <div className="callout my-6">
        {value.title && <p className="mb-2 font-medium text-white">{value.title}</p>}
        <p className="text-muted">{value.body}</p>
      </div>
    ),
    embed: ({ value }) => (
      <div className="my-6 rounded-xl border border-border p-4">
        <a
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          {value.title || value.url}
        </a>
      </div>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-2xl font-semibold text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-semibold text-white">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-accent pl-4 text-muted italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-muted">{children}</p>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="rounded bg-surface-elevated px-1.5 py-0.5 text-sm text-accent">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
      <a href={value?.href} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function PortableTextRenderer({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return (
    <div className="prose-nexa">
      <PortableText value={value} components={components} />
    </div>
  );
}
