import { allPosts } from "content-collections";
import Link from "next/link";
import React from "react";
import { GetStaticProps } from "next";
import dayjs from "dayjs";

interface HomeProps {
  posts: typeof allPosts;
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* <div className="md:w-[50%] mx-auto  border-2 border-black p-5 bg-green-300">
        <div className="text-2xl font-bold">Hi, Ibnu Musyaffa</div>
        <div>
          I&apos;m a software engineer, writer, and open-source contributor. In
          this website, I write articles and offer books that cover software
          engineering and cloud computing.
        </div>
      </div> */}


      <div className="md:w-[50%] mx-auto bg-white  border-2 border-black">
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
