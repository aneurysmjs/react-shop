import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC = path.resolve(dirname, 'src');
const SCRIPTS = path.resolve(dirname, 'scripts');

export default defineConfig({
  plugins: [react()],
  test: {
    include: [`${SRC}/**/*.test.ts(x)?`, `${SCRIPTS}/**/*.test.ts(x)?`],
    environment: 'jsdom',
    setupFiles: './config/vitest/setup.config.ts',
    env: process.env,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(dirname, 'src') }],
  },
});
