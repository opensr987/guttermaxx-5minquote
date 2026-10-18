/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Short links used in the Fall drip texts (one text each):
  // go.guttermaxx.com/r/<6-char code> -> worker click tracker -> their estimate.
  async redirects() {
    return [
      {
        source: "/r/:code([A-Za-z0-9]{6})",
        destination: "https://guttermaxx-5minquote-worker.vercel.app/api/drip?c=:code&a=rewatch",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
