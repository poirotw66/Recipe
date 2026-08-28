import { handle } from "@astrojs/cloudflare/handler";
import type { SSRManifest } from "astro";
import { App } from "astro/app";
import { asNotFound, isErrorPagePath } from "./lib/error-page.js";
import { applyFridgeQueryRobots } from "./lib/fridge-indexing";

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);

  return {
    default: {
      async fetch(request: Parameters<typeof handle>[2], env: Parameters<typeof handle>[3], context: Parameters<typeof handle>[4]) {
        const requestUrl = new URL(request.url);
        const pathname = requestUrl.pathname;
        const response = await handle(manifest, app, request, env, context);
        const statusAwareResponse = isErrorPagePath(pathname) ? asNotFound(response) : response;
        return applyFridgeQueryRobots(statusAwareResponse, requestUrl);
      }
    }
  };
}
