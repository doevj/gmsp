export function removeLangPrefix(url: string): string {
  return url.replace(/^\/[a-z]{2}\//, '/');
}

export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[\s\-]+/g, '_')
    .toUpperCase()
    .toLowerCase();
}