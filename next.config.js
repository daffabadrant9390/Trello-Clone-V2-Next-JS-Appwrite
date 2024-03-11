/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cloud.appwrite.io', 'links.papareact.com'],
  },
  // INFO: Currently set this to be false due to react-beautiful-dnd limitation
  reactStrictMode: false,
};

module.exports = nextConfig;
