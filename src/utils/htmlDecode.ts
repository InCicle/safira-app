export function htmlDecode(value: string) {
  const doc = new DOMParser().parseFromString(value, 'text/html');
  return doc.documentElement.textContent;
}
