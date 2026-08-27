import { handle } from "@astrojs/cloudflare/handler";
import type { SSRManifest } from "astro";
import { App } from "astro/app";
import { asNotFound, isErrorPagePath } from "./lib/error-page";

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);

  return {
    default: {
      async fetch(request: Parameters<typeof handle>[2], env: Parameters<typeof handle>[3], context: Parameters<typeof handle>[4]) {
        const pathname = new URL(request.url).pathname;
        const response = await handle(manifest, app, request, env, context);
        return isErrorPagePath(pathname) ? asNotFound(response) : response;
      }
    }
  };
}
