export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  author,
  tags,
  publishedAt,
  excerpt,
  coverImage
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  author,
  tags,
  publishedAt,
  excerpt,
  coverImage,
  body
}`;

export const caseStudiesQuery = `*[_type == "caseStudy"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  industry,
  coverImage,
  challenge,
  results,
  metrics,
  publishedAt
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  client,
  industry,
  coverImage,
  challenge,
  solution,
  results,
  metrics,
  publishedAt
}`;
