/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      "components",
      "constants",
      "e2e-tests",
      "hooks",
      "models",
      "pages",
      "services",
    ],
  },
  webpack: (config) => {
    config.experiments.topLevelAwait = true;

    return config;
  },
};

module.exports = nextConfig;
