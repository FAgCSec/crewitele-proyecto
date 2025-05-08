// @ts-check
import { defineConfig } from 'astro/config';

import auth from "auth-astro";

import vercel from "@astrojs/vercel";




// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [auth()],
  adapter: vercel(),
  vite: {
    server: {
      https: {
        key: './localhost-key.pem',
        cert: './localhost.pem',
      }
    }
  },
});