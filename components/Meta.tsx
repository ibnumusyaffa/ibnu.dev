import React from "react";
import Head from "next/head";

interface MetaProps {
  title: string;
  description: string;
  url: string;

  type?: "website" | "article"; // Add type for different schemas
  publishDate?: string;
  modifiedDate?: string;
}

function Meta({
  title,
  description,
  url,
  type = "website",
  publishDate,
  modifiedDate,
}: MetaProps) {
  const fullUrl = `${process.env.NEXT_PUBLIC_URL}/${url}`;
  const thumbnail = `${
    process.env.NEXT_PUBLIC_URL
  }/api/image?title=${encodeURIComponent(title)}&date=${encodeURIComponent(
    publishDate || ""
  )}&cache=${Math.floor(Date.now() / 1000)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "BlogPosting" : "Website",
    headline: title,
    author: {
      "@type": "Person",
      name: "Ibnu Musyaffa",
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    description: description,
    image: thumbnail,
    url: fullUrl,
  };

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="title" content={title} />
      <meta name="description" content={description || ""} />
      <meta name="robots" content="index,follow" />
      <meta name="language" content="id" />
      <meta name="author" content="Ibnu Musyaffa" />
      <link rel="canonical" href={fullUrl} />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="ibnu.dev" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:description" content={description || ""} />
      <meta property="og:image" content={thumbnail} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@IbnuMusyaffa" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || ""} />
      <meta name="twitter:image" content={thumbnail} />

      {/* Add article-specific meta tags */}
      {type === "article" && (
        <>
          <meta property="article:published_time" content={publishDate} />
          <meta
            property="article:modified_time"
            content={modifiedDate || publishDate}
          />
          <meta property="article:author" content="Ibnu Musyaffa" />
        </>
      )}

      {/* Add JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

export default Meta;
