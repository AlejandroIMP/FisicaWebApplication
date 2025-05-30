// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import icon from 'astro-icon';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    site: 'https://example.com',
    integrations: [mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex]
    }), sitemap(), icon(), react()],
});