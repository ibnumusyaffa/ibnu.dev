import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { Options } from "rehype-pretty-code";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";

const options: Options = {
  theme: "github-dark",
};

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.mdx",
  schema: (z) => ({
    published_at: z.string(),
    updated_at: z.string(),
    title: z.string(),
    description: z.string(),
    thumbnail: z.string(),
    show_thumbnail: z.boolean(),
    show_toc: z.boolean(),
    is_published: z.boolean(),
  }),
  transform: async (post, ctx) => {
    const mdx = await compileMDX(ctx, post, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, [rehypePrettyCode, options]],
    });

    const slugger = new GithubSlugger();
    let inCodeBlock = false;
    const toc = post.content
      .split("\n")
      .filter((line) => {
        // Toggle code block state
        if (line.trim().startsWith("```")) {
          inCodeBlock = !inCodeBlock;
          return false;
        }
        // Skip if inside code block
        if (inCodeBlock) return false;
        // Check for heading pattern
        return line.match(/^#{1,3}\s/);
      })
      .map((line) => {
        const [level, title] = line.split(/(?<=#)\s/); 
        return {
          level: level.length,
          title,
          href: "#" + slugger.slug(title),
        };
      });

    return {
      ...post,
      mdx,
      slug: post._meta.path,
      url: `/article/${post._meta.path}`,
      readingTime: readingTime(post.content).text,
      toc,
    };
  },
});

export default defineConfig({
  collections: [posts],
});

export const dynamicParams = false;
