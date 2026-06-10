import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { projectId, dataset, isSanityConfigured } from "./client";

const builder =
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity image builder not configured");
  }
  return builder.image(source);
}

export function getCoverImageUrl(
  source: SanityImageSource | null | undefined,
  width = 600,
  height = 375,
): string | null {
  if (!source || !isSanityConfigured || !builder) return null;
  return builder.image(source).width(width).height(height).fit("crop").url();
}
