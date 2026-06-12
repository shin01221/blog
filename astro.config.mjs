// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import remarkGithubAlerts from 'remark-github-alerts';

// https://astro.build/config
export default defineConfig({
  site: 'https://medhat-blog.netlify.app',
  adapter: netlify(),
  output: 'static',
  markdown: {
    remarkPlugins: [remarkGithubAlerts],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});