export function checkPermission(p: string | string[], list: string[]) {
  return p instanceof Array ? p.every(p => list.includes(p)) : list.includes(p);
}
