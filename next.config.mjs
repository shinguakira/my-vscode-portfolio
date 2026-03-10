import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "portfolio-api-ten-delta.vercel.app",
      },
      {
        protocol: "https",
        hostname: "img.logo.dev",
      },
    ],
  },
}

export default withNextIntl(nextConfig)
