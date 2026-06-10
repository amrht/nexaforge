import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt Text" }),
            defineField({ name: "caption", type: "string", title: "Caption" }),
          ],
        },
        {
          type: "object",
          name: "codeBlock",
          title: "Code Block",
          fields: [
            defineField({ name: "language", type: "string", title: "Language" }),
            defineField({ name: "code", type: "text", title: "Code" }),
          ],
        },
        {
          type: "object",
          name: "callout",
          title: "Callout",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "body", type: "text", title: "Body" }),
          ],
        },
        {
          type: "object",
          name: "embed",
          title: "Embed",
          fields: [
            defineField({ name: "url", type: "url", title: "URL" }),
            defineField({ name: "title", type: "string", title: "Title" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "coverImage",
    },
    prepare({ title, author, media }) {
      return {
        title,
        subtitle: author,
        media,
      };
    },
  },
});
