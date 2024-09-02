import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { patchCssModules } from 'vite-css-modules';
import { imagetools } from 'vite-imagetools';
import { fileURLToPath, URL } from 'url';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkgfm from 'remark-gfm';
import remarkemoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import remarkMath from 'remark-math';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import fs from 'fs';
import { transformerNotationHighlight } from '@shikijs/transformers';
import rehypeMdxImportMedia from 'rehype-mdx-import-media';
import rehypeKatex from 'rehype-katex';
const options = {
  theme: JSON.parse(fs.readFileSync('./src/helpers/bayesyntax.json', 'utf-8')),
  defaultLang: 'plaintext',
  keepBackground: false,
  showLineNumbers: true,
  grid: true,
  transformers: [transformerNotationHighlight()]
} as Options;

// https://vitejs.dev/config/
export default defineConfig(async (): Promise<UserConfig> => {
  const mdx = await import('@mdx-js/rollup');

  return {
    //use patchCssModules until VITE 5.3 is released
    plugins: [
      patchCssModules(),
      imagetools(),
      mdx.default({
        remarkPlugins: [remarkMath, remarkgfm, remarkFrontmatter, remarkMdxFrontmatter, remarkemoji],
        rehypePlugins: [
          rehypeSlug,
          rehypeKatex,
          withToc,
          withTocExport,
          [rehypePrettyCode, options],
          rehypeMdxImportMedia
        ],
        providerImportSource: '@mdx-js/react'
      }),
      react(),
      TanStackRouterVite()
    ],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },
    base: './',
    resolve: {
      alias: [
        /* '@': '/src' */
        { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }
      ]
    },
    assetsInclude: [`**/*.zip`]
  };
});
