const errorPagePath = /^\/(?:(?:en|ja|ko)\/)?404(?:\.html)?\/?$/;

/** @param {string} pathname */
export function isErrorPagePath(pathname) {
  return errorPagePath.test(pathname);
}

/**
 * @param {Response} response
 * @returns {Response}
 */
export function asNotFound(response) {
  if (response.status === 404) {
    return response;
  }

  if (response.status >= 300 && response.status < 400) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, follow");
  return new Response(response.body, {
    status: 404,
    statusText: "Not Found",
    headers
  });
}
