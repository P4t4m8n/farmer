import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
        {
            protocol: 'https',
            hostname: 'images.pexels.com',
            port: '',
        },
        {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
        },
        {
            protocol: 'https',
            hostname: 'domf5oio6qrcr.cloudfront.net',
            port: '',
        }
    ]
}
};

export default nextConfig;
