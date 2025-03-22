import { allPosts } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import {
  TableOfContent,
  TableOfContentMobile,
} from "@/components/TableOfContent";
import React from "react";
import Image from "next/image";
import { GetStaticProps, GetStaticPaths } from "next";

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
    <React.Fragment>
      <header className="mb-10 mt-3 flex md:items-center flex-col">
        <h1 className="text-3xl md:text-4xl  font-semibold md:text-center capitalize">
          {post.title}
        </h1>
        <div className="flex space-x-3 mt-5">
          <div className="text-sm text-gray-700">{post.date}</div>
          <div className="text-gray-700">·</div>
          <div className="text-sm text-gray-700">{post.readingTime}</div>
          <div className="text-gray-700">·</div>
          <div>
            <div>{post.category}</div>
          </div>
        </div>
      </header>
      {post.thumbnail && post.show_thumbnail ? (
        <div className="mb-10">
          <Image
            className="rounded"
            src={"/" + post.thumbnail}
            width={1920}
            height={1080}
            alt={post.title}
          />
        </div>
      ) : null}
    </React.Fragment>
  );
}

interface PostPageProps {
  post: typeof allPosts[0];
}

export default function PostPage({ post }: PostPageProps) {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <article className="mb-10 ">
        <div className="relative flex justify-center">
          <div className="md:w-[45%] w-full">
            <Header post={post}></Header>
            {post.show_toc ? (
              <div className="border border-gray-200 md:hidden bg-gray-50 rounded">
                <TableOfContentMobile toc={post.toc}></TableOfContentMobile>
              </div>
            ) : null}
            <div className="prose prose-purple max-w-full mt-5">
              <MDXContent code={post.mdx} />
            </div>
          </div>
          {post.show_toc ? (
            <div className="hidden md:block ml-10">
              <div className="fixed top-20  border-gray-200 pl-5 py-2 border-l">
                <TableOfContent toc={post.toc}></TableOfContent>
              </div>
            </div>
          ) : null}
        </div>
      </article>
    </div>
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
  const post = allPosts.find((post) => post._meta.path === params?.slug);

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