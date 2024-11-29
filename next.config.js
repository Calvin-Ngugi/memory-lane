/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: [
        "res.cloudinary.com", 
        "nationaltoday.com", 
        "cdn.shopify.com",
        "encrypted-tbn0.gstatic.com"
      ],
    },
  };
  
  module.exports = nextConfig;
  