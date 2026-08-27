const errorPagePath = /^\/(?:(?:en|ja|ko)\/)?404(?:\.html)?\/?$/;

export function isErrorPagePath(pathname: string): boolean {
  return errorPagePath.test(pathname);
}

export function asNotFound(response: Response): Response {
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
