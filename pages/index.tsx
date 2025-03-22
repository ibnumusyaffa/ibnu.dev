import { allPosts } from "content-collections";
import Link from "next/link";
import React from "react";
import { GetStaticProps } from "next";

interface HomeProps {
  posts: typeof allPosts;
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-medium text-gray-900 mb-4">
            Blog Posts
          </h1>
          <div className="w-12 h-1 bg-gray-900"></div>
        </div>

        <div className="space-y-5">
          {posts.map((post) => (
            <Link key={post.url} href={post.url} className="group block">
              <article className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl text-gray-900 group-hover:text-gray-600 transition-colors duration-200">
                      {post.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Built with Next.js and MDX
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: allPosts.map((post) => ({
        url: post.url,
        title: post.title,
        date: post.date,
      })),
    },
  };
};
