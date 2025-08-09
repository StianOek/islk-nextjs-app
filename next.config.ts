import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    domains: [
      "cdn.sanity.io",
      "d3nn82uaxijpm6.cloudfront.net",
      "dgalywyr863hv.cloudfront.net",
      "images.strava.com",
    ],
  },
};

export default nextConfig;
