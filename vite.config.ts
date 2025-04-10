import { BuildOptions, defineConfig } from "vite";
import marko from "@marko/run/vite";
import nodeAdapter from "@marko/run-adapter-node";
import { imagetools } from "vite-imagetools";

// Normalize and resolve the path to ensure it's absolute and POSIX-compliant
export default defineConfig(() => {
  return {
    plugins: [
      marko({
        adapter: nodeAdapter(),
        // The default redirect logic is not suitable for our app's deployment because
        // of the Cloudflare Worker Proxy. This results in redirects to our 'internal'
        // hosting domain, which is not the intended behavior. Instead, we manually
        // manage redirection logic in middleware using buildPathnameFromRoute.ts.
        trailingSlashes: "Ignore",
      }),
      imagetools(),

    ],
  };
});
