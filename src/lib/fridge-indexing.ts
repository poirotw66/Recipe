const FRIDGE_TOOL_PATH = /^\/(?:en\/|ja\/|ko\/)?tools\/fridge-recipe\/?$/;

export function isFridgeToolQueryState(url: URL): boolean {
  return (
    FRIDGE_TOOL_PATH.test(url.pathname) &&
    (url.searchParams.has("ingredients") || url.searchParams.has("preferences"))
  );
}

export function applyFridgeQueryRobots(response: Response, requestUrl: URL): Response {
  if (!isFridgeToolQueryState(requestUrl)) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, follow");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}
