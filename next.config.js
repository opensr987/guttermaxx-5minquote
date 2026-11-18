/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Short links used in the Fall drip texts (one text each):
  // go.guttermaxx.com/<r|b|p|c>/<6-char code> -> worker click tracker
  // (r = rewatch estimate, b = book in-home demo, p = prequalify, c = call me now).
  // Speed (owner, Nov 17 2026): images never change name, so browsers keep
  // them for a year. landing.js is only long-cached when loaded with ?v=<deploy>.
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/landing.js",
        has: [{ type: "query", key: "v" }],
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/r/:code([A-Za-z0-9]{6})",
        destination: "https://guttermaxx-5minquote-worker.vercel.app/api/drip?c=:code&a=rewatch",
        permanent: false,
      },
      {
        source: "/b/:code([A-Za-z0-9]{6})",
        destination: "https://guttermaxx-5minquote-worker.vercel.app/api/drip?c=:code&a=demo",
        permanent: false,
      },
      {
        source: "/p/:code([A-Za-z0-9]{6})",
        destination: "https://guttermaxx-5minquote-worker.vercel.app/api/drip?c=:code&a=prequalify",
        permanent: false,
      },
      {
        source: "/c/:code([A-Za-z0-9]{6})",
        destination: "https://guttermaxx-5minquote-worker.vercel.app/api/drip?c=:code&a=call_me",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
