export function removeLangPrefix(url: string): string {
  return url.replace(/^\/[a-z]{2}\//, '/');
}