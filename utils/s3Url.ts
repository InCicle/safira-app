export const s3Url = (path: string) => {
  const windowOrigin = window.location.origin;
  return `${windowOrigin}/${path}`;
}