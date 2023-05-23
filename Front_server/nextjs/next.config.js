/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
    images: {
        disableStaticImages: true,
        loader: 'default',
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[name].[hash][ext]',
        },
      });
      return config;
    },
}

module.exports = nextConfig
