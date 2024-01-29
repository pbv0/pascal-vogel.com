import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  redirects: {
    '/certifications': 'https://www.credly.com/users/pascal-vogel.5a5c8be2'
  }
});
