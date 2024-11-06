// next.config.mjs
export default {
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Scope only API routes to be proxied
        destination: 'http://localhost:8080/:path*'  // Proxy to backend
      },
    ];
  },
};
