import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/utils/__tests__/**/*.test.{ts,js}'],
  },
});