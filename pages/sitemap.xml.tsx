import { GetServerSideProps } from "next";
import { allPosts, Post } from "content-collections";

function generateSiteMap(posts: Post[]) {
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
