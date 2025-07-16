export const domainName = (() => {
  const hostname = import.meta.env.BASE_URL;
  const isDevelopmentDomain = hostname.includes('stage');
  const jumpNumber = isDevelopmentDomain ? -3 : -2;
  const domain = hostname.split('.').slice(jumpNumber).join('.');

  return domain;
})();
