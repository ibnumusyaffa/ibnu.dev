import { allPosts } from "content-collections";
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

function Header({
  post,
}: {
  post: {
    title: string;
    date: string;
    readingTime: string;
    category: string;
    thumbnail: string;
    show_thumbnail: boolean;
  };
}) {
  return (
    <div className="border-b-2 border-black">
      <header className="flex flex-col bg-green-300 px-10 py-10">
        <h1 className="text-3xl   font-semibold  capitalize">{post.title}</h1>
        <div className="flex gap-2 mt-5">
          <div className="text-gray-700">
            {dayjs(post.date).format("MMMM D, YYYY")}
          </div>
          <div className="text-gray-700">·</div>
          <div className="text-gray-700">{post.readingTime}</div>
        </div>
      </header>
    </div>
  );
}

interface PostPageProps {
  post: (typeof allPosts)[0];
}

export default function PostPage({ post }: PostPageProps) {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="mb-10">
      <Meta
        title={post.title}
        description={post.description}
        date={post.date}
        url={post.url}
      ></Meta>
      <div className="relative grid grid-cols-[1fr_50%_1fr]  min-h-screen ">
        <div className=""></div>
        <div className=" bg-white border-2 border-black">
          <Header post={post}></Header>

          {post.thumbnail && post.show_thumbnail ? (
            <div className="px-10 mt-10 relative">
              <Image
                src={"/" + post.thumbnail}
                width={700}
                height={100}
                // fill={true}
                alt={post.title}
              />
            </div>
          ) : null}
          {post.show_toc ? (
            <div className="border border-gray-200 md:hidden bg-gray-50 rounded">
              <TableOfContentMobile toc={post.toc}></TableOfContentMobile>
            </div>
          ) : null}
          <div className="prose prose-purple max-w-full  p-10">
            <MDXContent code={post.mdx} />
          </div>
        </div>
        {post.show_toc ? (
          <div className="sticky top-5 right-0 hidden md:block  max-h-screen ">
            <div className="pl-5 py-2 border-l border-gray-300 ml-5">
              <TableOfContent toc={post.toc}></TableOfContent>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex justify-center mt-10">
        <div className="md:w-[50%] w-full bg-white border-2 border-black p-10">
          <Giscus
            repo="ibnumusyaffa/ibnu.dev"
            repoId="MDEwOlJlcG9zaXRvcnkzNjMwMjEwNzk="
            category="General"
            categoryId="DIC_kwDOFaNDF84CO_nG"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang="en"
          ></Giscus>
        </div>
      </div>
    </article>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => ({
    params: { slug: post._meta.path },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((post) => post.slug === params?.slug && post.is_published);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
