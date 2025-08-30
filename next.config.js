/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "tailwind-merge", "clsx"],
  },
  transpilePackages: ["lucide-react", "tailwind-merge", "clsx"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "lucide-react": require.resolve("lucide-react"),
      "tailwind-merge": require.resolve("tailwind-merge"),
      clsx: require.resolve("clsx"),
    }
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
