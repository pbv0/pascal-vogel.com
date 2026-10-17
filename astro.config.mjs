import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://pascal-vogel.com',
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/certifications': 'https://www.credly.com/users/pascal-vogel.5a5c8be2'
  }
});
