
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "pt92y169";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

if (!projectId) {
  console.warn(
    "[sanity] Missing project ID. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local",
  );
}
