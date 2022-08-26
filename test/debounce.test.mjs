import { describe, expect, test } from '@jest/globals';
// eslint-disable-next-line import/no-unresolved
import got from 'got';
import { debounce } from '../lib/index.mjs';

const client = got.extend(debounce).extend({ debounce: [350, 450] });

describe('got plugin debounce', () => {
  test('debounce concurrent requests', async () => {
    const startedAt = Date.now();
    await Promise.all([
      client('https://www.google.com'),
      client('https://www.google.com'),
      client('https://www.google.com'),
      client('https://www.google.com'),
    ]);
    expect(Date.now() - startedAt).toBeGreaterThan(1000);
  });
});
