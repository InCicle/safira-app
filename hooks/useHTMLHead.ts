export type FaviconOptionType = 'new-notification-icon' | 'incicle-logo';

export type HeadValuesType = {
  pageTitle: string;
  faviconName: FaviconOptionType;
};

function createFaviconHandler() {
  const faviconElement = document.getElementById('favicon-svg');

  return {
    defineFavicon(icon: FaviconOptionType) {
      switch (icon) {
        case 'incicle-logo':
          faviconElement?.setAttribute('href', 'https://static-incicle.s3.amazonaws.com/incicle-favicon.svg');
          break;
        case 'new-notification-icon':
          faviconElement?.setAttribute('href', 'https://static-incicle.s3.amazonaws.com/new-notification-favicon.svg');
          break;
        default:
          break;
      }
    },
  };
}

function createPageTitleHandler() {
  return {
    definePageTitle(content: ((title: string) => string) | string) {
      if (typeof content === 'string') {
        document.title = content;
        return;
      }

      const value = content(document.title);

      document.title = value;
    },
  };
}

export function useHTMLHead() {
  const { defineFavicon } = createFaviconHandler();
  const { definePageTitle } = createPageTitleHandler();

  return {
    defineFavicon,
    definePageTitle,
  };
}
