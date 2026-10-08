import withPWA from "@ducanh2912/next-pwa";

const withPWAFn = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {};

export default withPWAFn(nextConfig);