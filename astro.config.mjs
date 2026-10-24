// @ts-check
import { readdir } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

const galleryDirectory = resolve('public', 'Galerie');
const galleryModuleId = 'virtual:gallery-images';
const resolvedGalleryModuleId = `\0${galleryModuleId}`;

/** @type {import('vite').Plugin} */
const galleryImagesPlugin = {
  name: 'gallery-images',
  resolveId(id) {
    if (id === galleryModuleId) return resolvedGalleryModuleId;
  },
  async load(id) {
    if (id !== resolvedGalleryModuleId) return;

    const entries = await readdir(galleryDirectory, { withFileTypes: true });
    const images = entries
      .filter((entry) => entry.isFile() && /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(entry.name))
      .map((entry) => ({
        src: `/Galerie/${encodeURIComponent(entry.name)}`,
        title: entry.name.replace(/\.[^.]+$/, ''),
      }))
      .sort((first, second) => first.title.localeCompare(second.title, 'de'));

    return `export default ${JSON.stringify(images)};`;
  },
  configureServer(server) {
    server.watcher.add(galleryDirectory);
    server.watcher.on('all', (event, file) => {
      if (event !== 'add' && event !== 'unlink') return;

      const relativePath = relative(galleryDirectory, file);
      if (relativePath.startsWith('..') || isAbsolute(relativePath)) return;

      const module = server.moduleGraph.getModuleById(resolvedGalleryModuleId);
      if (module) server.moduleGraph.invalidateModule(module);
      server.ws.send({ type: 'full-reload' });
    });
  },
};

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  vite: {
    plugins: [galleryImagesPlugin],
  },
});