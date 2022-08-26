import { setTimeout } from 'node:timers/promises';

const crypto = await import('node:crypto');

const customOptionsHook = (raw, options) => {
  if (raw.debounce) {
    options.context.debounce = {
      queue: Promise.resolve(),
      duration: raw.debounce,
    };
    delete raw.debounce;
  }
};

const debounceHook = async (options) => {
  if (options.context.debounce == null) return;
  const { debounce } = options.context;
  const timeout = Array.isArray(debounce.duration)
    ? crypto.randomInt(...debounce.duration)
    : debounce.duration;
  const previous = debounce.queue;
  debounce.queue = (async () => {
    await previous;
    await setTimeout(timeout);
  })();
  await debounce.queue;
};

export default {
  hooks: {
    init: [customOptionsHook],
    beforeRequest: [debounceHook],
  },
};
