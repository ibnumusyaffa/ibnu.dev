import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
 
const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
};
 
export default withContentCollections(nextConfig);