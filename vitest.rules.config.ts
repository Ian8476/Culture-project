import { defineConfig } from 'vitest/config';

// Runner aislado para los tests de Security Rules: corren contra el emulador de
// Firestore (no en jsdom) y se lanzan vía `pnpm test:rules`.
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/rules/**/*.test.ts'],
  },
});
