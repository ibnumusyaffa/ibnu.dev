import { GetServerSideProps } from "next";
import { allPosts } from "content-collections";

function generateSiteMap(posts: { url: string; updated_at: string; published_at: string }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add the static URLs manually -->
     <url>
       <loc>${process.env.NEXT_PUBLIC_URL}</loc>
     </url>
     <url>
       <loc>${process.env.NEXT_PUBLIC_URL}/about</loc>
     </url>
     ${posts
       .map((item) => {
         return `
           <url>
               <loc>${`${process.env.NEXT_PUBLIC_URL}${item.url}`}</loc>
               <lastmod>${item.updated_at}</lastmod>
                <changefreq>monthly</changefreq>
           </url>
         `;
       })
       .join("")}
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = allPosts
    .filter((post) => post.is_published)
    .map((post) => {
      post.content = "";
      post.mdx = "";
      return {
        url: post.url,
        updated_at: post.updated_at,
        published_at: post.published_at,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );

  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(posts);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function SiteMap() {}
