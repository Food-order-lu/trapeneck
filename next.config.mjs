// Set GH_PAGES=1 when building for the food-order-lu.github.io/trapeneck/
// deployment so Next.js prefixes every asset URL with /trapeneck. Locally
// (npm run dev / npm run build), basePath stays empty and the site serves
// from /. Toggled per-build via env var rather than hard-coded so we don't
// have to flip the file on every deploy.
const isGhPages = process.env.GH_PAGES === '1';
const basePath = isGhPages ? '/trapeneck' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  // Expose the basePath to the runtime so inline style URLs and other raw
  // string references (which Next.js does NOT auto-rewrite, unlike <Link>
  // or <Image>) can prefix it explicitly.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
