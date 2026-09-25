import { defineConfig } from 'vitest/config';

/** Where the game is served in production: the GitHub Pages sub-path. Override with ET_BASE (e.g. ET_BASE=/). */
const PRODUCTION_BASE = '/endless-transit/play/';

export default defineConfig(({ command, isPreview }) => {
  const production = command === 'build' || isPreview === true;
  return {
    base: process.env.ET_BASE ?? (production ? PRODUCTION_BASE : '/'),
    // The build stamp of the title screen. Only `main.ts` reads it; the engine never sees it.
    define: { __ET_BUILD__: JSON.stringify(process.env.ET_BUILD ?? 'dev') },
    build: { target: 'es2023', outDir: 'dist', emptyOutDir: true },
    preview: { port: 4173, strictPort: true },
    test: {
      include: ['tests/**/*.test.ts'],
      environment: 'node',
      // A quarter of the cores: at a half or more the heavy tests starve on this machine and pass their 5 s limit.
      maxWorkers: '25%',
    },
  };
});
