import { defineConfig } from 'vitest/config';

/** Where the game is served in production: the GitHub Pages sub-path. Override with ET_BASE (e.g. ET_BASE=/). */
const PRODUCTION_BASE = '/endless-transit/play/';

export default defineConfig(({ command, isPreview }) => {
  const production = command === 'build' || isPreview === true;
  return {
    base: process.env['ET_BASE'] ?? (production ? PRODUCTION_BASE : '/'),
    build: { target: 'es2023', outDir: 'dist', emptyOutDir: true },
    preview: { port: 4173, strictPort: true },
    test: {
      include: ['tests/**/*.test.ts'],
      environment: 'node',
    },
  };
});
