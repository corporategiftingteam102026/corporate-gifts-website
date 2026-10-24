// import type { NextConfig } from "next";

// const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

// const nextConfig: NextConfig = {
//   output: "export",

//   images: {
//     unoptimized: true,
//   },

//   trailingSlash: true,

//   basePath: isGitHubPages ? "/corporate-gifts-website" : "",
//   assetPrefix: isGitHubPages ? "/corporate-gifts-website/" : "",
// };

// export default nextConfig;









import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;
