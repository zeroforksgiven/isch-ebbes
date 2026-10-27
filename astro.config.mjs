// @ts-check
import { readdir, stat } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

const publicContent = [
  {
    moduleId: 'virtual:gallery-images',
    directory: resolve('public', 'Galerie'),
    matches: (filename) => /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(filename),
    sortByModifiedDate: true,
    getData: (filename) => ({
      src: `/Galerie/${encodeURIComponent(filename)}`,
      title: filename.replace(/\.[^.]+$/, ''),
    }),
    sort: (first, second) =>
      second.modifiedAt - first.modifiedAt ||
      first.title.localeCompare(second.title, 'de'),
  },
  {
    moduleId: 'virtual:flyer-files',
    directory: resolve('public', 'Flyer'),
    matches: () => true,
    getData: (filename) => {
      const title = filename.replace(/\.[^.]+$/, '');
      const event = title.match(/^(\d{2})_(\d{2})_(\d{4})-(.+)$/);

      return {
        src: `/Flyer/${encodeURIComponent(filename)}`,
        date: event ? `${event[1]}.${event[2]}.${event[3]}` : '',
        location: event ? event[4].replaceAll('_', ' ') : title.replaceAll('_', '.'),
        title: title.replaceAll('_', '.').replace(/-(?=.)/, ' - '),
        sortDate: event ? `${event[3]}-${event[2]}-${event[1]}` : '',
      };
    },
    sort: (first, second) =>
      (first.sortDate || first.title).localeCompare(second.sortDate || second.title, 'de'),
  },
].map((content) => ({
  ...content,
  resolvedModuleId: `\0${content.moduleId}`,
}));

/** @type {import('vite').Plugin} */
const publicContentPlugin = {
  name: 'public-content',
  resolveId(id) {
    return publicContent.find((content) => content.moduleId === id)?.resolvedModuleId;
  },
  async load(id) {
    const content = publicContent.find((item) => item.resolvedModuleId === id);
    if (!content) return;

    const entries = await readdir(content.directory, { withFileTypes: true });
    const files = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && content.matches(entry.name))
        .map(async (entry) => {
          const data = content.getData(entry.name);
          if (!content.sortByModifiedDate) return data;

          const { mtimeMs } = await stat(resolve(content.directory, entry.name));
          return { ...data, modifiedAt: mtimeMs };
        }),
    );
    files.sort(content.sort);

    return `export default ${JSON.stringify(files)};`;
  },
  configureServer(server) {
    server.watcher.add(publicContent.map((content) => content.directory));
    server.watcher.on('all', (event, file) => {
      if (event !== 'add' && event !== 'unlink') return;

      const content = publicContent.find((item) => {
        const relativePath = relative(item.directory, file);
        return !relativePath.startsWith('..') && !isAbsolute(relativePath);
      });
      if (!content) return;

      const module = server.moduleGraph.getModuleById(content.resolvedModuleId);
      if (module) server.moduleGraph.invalidateModule(module);
      server.ws.send({ type: 'full-reload' });
    });
  },
};

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  vite: {
    plugins: [publicContentPlugin],
  },
});