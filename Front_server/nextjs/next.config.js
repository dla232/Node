/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    images: {
        disableStaticImages: true,
        loader: 'default',
    },
    webpack(config) {
      config.server = {
        port: 8080,
      };
      return config;
    },
}

module.exports = nextConfig
