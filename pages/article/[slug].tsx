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
