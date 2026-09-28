import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: projectRoot,
  publicDir: false,
  base: './',
  plugins: [createHtmlPlugin({ minify: true })],
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
    minify: 'esbuild',
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        home: resolve(projectRoot, 'index.html'),
        conteudo: resolve(projectRoot, 'html/index.html'),
        projetos: resolve(projectRoot, 'html/projetos.html'),
        cadastro: resolve(projectRoot, 'html/cadastro.html'),
      },
      output: {
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: (asset) => {
          const extension = asset.name?.split('.').pop();
          const folder = extension === 'css' ? 'css' : 'images';
          return `assets/${folder}/[name][extname]`;
        },
      },
    },
  },
});
