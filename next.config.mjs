/** @type {import('next').NextConfig} */

import withTM from 'next-transpile-modules';

const nextConfig = {
   reactStrictMode: true,

   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },
};

export default withTM(['mui-one-time-password-input'])(nextConfig);
