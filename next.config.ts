/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FINNHUB_API_KEY: process.env.FINNHUB_API_KEY,
    FMP_API_KEY: process.env.FMP_API_KEY,
  }
}

module.exports = nextConfig
