# Got Plugin Debounce

Ensure a time delay between HTTP requests.  
Use when targeting endpoints with rate limits.

## Install

`npm install got-plugin-debounce`

## Usage

```js
import plugin from 'got-plugin-debounce';

const client = got
  .extend(plugin) // load plugin
  .extend({ debounce: [350, 450] }) // random value ms in interval between 2 requests
  // .extend({ debounce: 350 }) // fixed 350 ms between 2 requests
  
  const startedAt = Date.now();
  await Promise.all([
      client('https://www.google.com'),
      client('https://www.google.com'),
      client('https://www.google.com'),
      client('https://www.google.com'),
    ]);
  const elapsed = Date.now() - startedAt;
  
  console.log(elapsed > 1000); // true
```
