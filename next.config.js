/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        "res.cloudinary.com", 
        "nationaltoday.com", 
        "cdn.shopify.com"
      ],
    },
  };
  
  module.exports = nextConfig;
  