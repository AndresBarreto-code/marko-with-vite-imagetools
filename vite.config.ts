import { BuildOptions, defineConfig } from "vite";
import marko from "@marko/run/vite";
import nodeAdapter from "@marko/run-adapter-node";
import { imagetools } from "vite-imagetools";

// Normalize and resolve the path to ensure it's absolute and POSIX-compliant
export default defineConfig(({ isSsrBuild }) => {
  const rollupOptions: BuildOptions["rollupOptions"] | undefined = isSsrBuild
    ? {
        output: {
          // Output the tracer.mjs file separately to the rest of the bundle so that
          // datadog is initialized before anything else.
          chunkFileNames: "[name].mjs",
          manualChunks(id) {
            if (id.includes("instrument")) {
              return "instrument";
            }
          },
        },
      }
    : undefined;

  return {
    build: {
      sourcemap: true, // Source map generation must be turned on so Sentry can use it.
      rollupOptions,
    },
    test: {
      include: ["src/**/*.test.{js,ts,marko}"],
    },
    ssr: {
      external: ["*"],
    },
    plugins: [
      marko({
        basePathVar: "__ASSET_BASE_PATH__",
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
