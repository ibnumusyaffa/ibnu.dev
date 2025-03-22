import { allPosts } from "content-collections";
import Link from "next/link";

export default function Posts() {
  return (
    <div className="p-10">
      {allPosts.map((post) => (
        <div key={post.url} className="border border-gray-300 p-3">
          <Link href={post.url}>
            <h3>{post.title}</h3>
            {/* <div>{post.description}</div>
            <div>{post.date.toDateString()}</div>
            <div>{String(post.is_published)}</div> */}
          </Link>
        </div>
      ))}
    </div>
  );
}
