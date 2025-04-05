import { allPosts, Post } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import {
  TableOfContent,
  TableOfContentMobile,
} from "@/components/TableOfContent";
import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from "next/image";
import { GetStaticProps, GetStaticPaths } from "next";
import dayjs from "dayjs";
import Meta from "@/components/Meta";
import Giscus from "@giscus/react";
import clsx from "clsx";

function Header({ post }: { post: Post }) {
  return (
    <div className="border-b-2 border-black">
      <header className="flex flex-col bg-green-300 px-10 py-10">
        <h1 className="text-3xl font-semibold capitalize">{post.title}</h1>
        <div className="flex gap-2 mt-5 text-gray-700">
          <div>{dayjs(post.published_at).format("DD MMMM YYYY")}</div>
          <div>·</div>
          <div>{post.readingTime}</div>
        </div>
      </header>
    </div>
  );
}

export default function PostPage({ post }: { post: Post }) {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="space-y-7">
      <Meta
        title={post.title}
        description={post.description}
        url={post.url}
        type="article"
        publishDate={post.published_at}
        modifiedDate={post.updated_at}
      />

      <div className="relative min-h-screen md:grid md:grid-cols-[1fr_50%_1fr]">
        {/* Left spacer */}
        <div />

        {/* Main content */}
        <div className="bg-white border-2 border-black">
          <Header post={post} />

          <div className="px-5 pt-6 space-y-7 md:p-10">
            {post.thumbnail && post.show_thumbnail ? (
              <div className="relative">
                <Image
                  src={"/" + post.thumbnail}
                  className="aspect-video object-cover"
                  height={450}
                  width={800}
                  alt={post.title}
                />
              </div>
            ) : null}

            {post.show_toc && (
              <div className="md:hidden">
                <TableOfContentMobile toc={post.toc} />
              </div>
            )}

            <div
              className={clsx(
                "prose prose-purple max-w-full",
                "prose-pre:-mx-5 md:prose-pre:mx-0 prose-pre:rounded-none"
              )}
            >
              <MDXContent code={post.mdx} />
            </div>
          </div>
        </div>

        {/* Table of contents */}
        {post.show_toc && (
          <div className="sticky top-5 right-0 hidden max-h-screen md:block">
            <div className="ml-5 border-l border-gray-300 py-2 pl-5">
              <TableOfContent toc={post.toc} />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <div className="w-full bg-white border-2 border-black p-10 md:w-[50%]">
          <h3 className="text-xl font-semibold mb-6 text-center">Connect with me</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <a
                href="https://x.com/ibnumusyaffa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 no-underline"
              >
                x.com/ibnumusyaffa
              </a>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <a
                href="https://github.com/ibnumusyaffa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 no-underline"
              >
                github.com/ibnumusyaffa
              </a>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <a
                href="https://www.linkedin.com/in/ibnu-musyaffa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 no-underline"
              >
                linkedin.com/in/ibnu-musyaffa
              </a>
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <a
                href="mailto:ibnu.musyaffa@gmail.com"
                className="text-blue-700 hover:text-blue-900 no-underline"
              >
                ibnu.musyaffa@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Comments section */}
      <div className="flex justify-center">
        <div className="w-full bg-white border-2 border-black p-10 md:w-[50%]">
          <Giscus
            repo="ibnumusyaffa/ibnu.dev"
            repoId="R_kgDOOSvFvA"
            category="General"
            categoryId="DIC_kwDOOSvFvM4CoulE"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="preferred_color_scheme"
            lang="id"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((post) => post.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  // remove content to reduce bundle size
  post.content = "";

  return {
    props: {
      post,
    },
  };
};
