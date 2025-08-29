/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
    FMP_API_KEY: process.env.FMP_API_KEY,
  },
  // Ensure client-side rendering for chart components
  transpilePackages: ['echarts'],
  // Webpack configuration to handle ECharts properly
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Handle echarts for client-side only
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
  // Improve error reporting in production
  productionBrowserSourceMaps: false,
  // Optimize for better performance
  swcMinify: true,
  // Handle static optimization
  trailingSlash: false,
  // Better error handling
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
}

module.exports = nextConfig
