import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'legacy/**'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Every photo on the page is a third-party hotlink from sml-ltd.com, which
      // the content audit already flags for download before production. Routing
      // those through next/image would proxy someone else's CDN and change the
      // DOM the stylesheet was written against, so plain <img> stays for now.
      '@next/next/no-img-element': 'off',
    },
  },
]

export default config
