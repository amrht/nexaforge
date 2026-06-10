import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset } from "./sanity/env";

if (!projectId) {
  throw new Error(
    "Sanity projectId is missing. Add NEXT_PUBLIC_SANITY_PROJECT_ID=your_id to .env.local",
  );
}

export default defineConfig({
  name: "nexaforge",
  title: "NexaForge CMS",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
