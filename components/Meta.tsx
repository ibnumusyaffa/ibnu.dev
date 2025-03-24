import React from "react";
import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
  date?: string;
  url?: string;
}

function Meta({
  title = "Ibnu Musyaffa - Blog",
  description = "Tulisan seputar pengembangan perangkat lunak dan teknologi lainnya",
  date = "",
  url = "",
}: MetaProps) {
  const fullUrl = `${process.env.NEXT_PUBLIC_URL}/${url}`;
  const thumbnail = `${
    process.env.NEXT_PUBLIC_URL
  }/api/image?title=${encodeURIComponent(title)}&date=${encodeURIComponent(
    date
  )}&cache=${Math.floor(Date.now() / 1000)}`;

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
      <meta property="og:locale" content="id_ID" />s
      <meta property="og:description" content={description || ""} />
      <meta property="og:image" content={thumbnail} />
      <meta property="og:image:alt" content={title} />u
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@IbnuMusyaffa" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || ""} />
      <meta name="twitter:image" content={thumbnail} />
    </Head>
  );
}

export default Meta;
