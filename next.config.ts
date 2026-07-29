import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // a stray lockfile in the home directory makes Next infer the wrong workspace
  // root, so pin it to this project
  turbopack: { root: path.resolve(import.meta.dirname) },
}

export default nextConfig
