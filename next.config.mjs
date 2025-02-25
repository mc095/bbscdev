// next.config.mjs
import mdx from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx', 'en'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.amiami.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    typedRoutes: false,
  },
  async rewrites() {
    return [
      {
        source: '/og-image.jpg',
        destination: 'https://demo.app/og?title=BBSC%20x%20SVEC',
      },
    ];
  },
  webpack(config) {
    return config;
  },
};

export default withNextIntl(withMDX(nextConfig));
