import { allPosts } from "content-collections";
import Link from "next/link";
import React from "react";
import { GetStaticProps } from "next";
import dayjs from "dayjs";
import Meta from "@/components/Meta";

interface HomeProps {
  posts: typeof allPosts;
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="min-h-screen">
      <Meta
        title="Ibnu Musyaffa"
        description="Ibnu Musyaffa"
        date="2025-03-23"
        url="https://ibnu.dev"
      ></Meta>

      {/* <div className="md:w-[50%] mx-auto  border-2 border-black p-5 bg-purple-300">
        <div className="text-lg font-medium">Ditulis oleh Ibnu Musyaffa</div>
      </div> */}

      <div className="md:w-[50%] mx-auto bg-white  border-2 border-black mt-5">
        <div className=" px-10 py-5 border-b-2  border-black bg-sky-300">
          <h1 className="mb-2 text-2xl font-medium text-gray-900">Blog</h1>
          <div className="w-12 h-1 bg-gray-900"></div>
        </div>

        <div className="space-y-5 p-10">
          {posts.map((post) => (
            <Link key={post.url} href={post.url} className="group block">
              <article className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl text-gray-950 hover:underline">
                      {post.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
                      <time
                        dateTime={post.date}
                        className="text-sm text-gray-500"
                      >
                        {dayjs(post.date).format("MMMM D, YYYY")}
                      </time>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: allPosts
        .filter((post) => post.is_published)
        .map((post) => ({
          url: post.url,
          title: post.title,
          date: post.date,
        }))
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
    },
  };
};
