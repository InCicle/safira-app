export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_APP_API_URL: string;
      VITE_APP_AUTHENTICATE: string;

      // API
      VITE_APP_API_URL_SOCIAL_NETWORK: string;
      VITE_APP_API_URL_PROJECTS: string;
      VITE_APP_API_URL_SCHEDULE: string;
      VITE_APP_API_URL_NOTIFICATIONS: string;
      VITE_APP_API_URL_CORE: string;
      VITE_APP_API_URL_EVALUATION: string;
      VITE_APP_API_URL_PD: string;
      VITE_APP_API_URL_OB: string;

      // WEB
      VITE_APP_WEB_URL_SOCIAL_NETWORK: string;
      VITE_APP_WEB_URL_PROJECTS: string;
      VITE_APP_WEB_URL_SCHEDULE: string;
      VITE_APP_WEB_URL_CORE: string;
      VITE_APP_WEB_URL_EVALUATION: string;
      VITE_APP_WEB_URL_PD: string;
      VITE_APP_WEB_URL_POLICY: string;
      VITE_APP_WEB_URL_OKR: string;
      VITE_APP_WEB_URL_DEPARTMENT: string;

      // AWS
      // Incicle
      VITE_APP_AWS_BUCKET_INCICLE_BUCKET_NAME: string;
      VITE_APP_AWS_BUCKET_INCICLE_ACCESS_KEY_ID: string;
      VITE_APP_AWS_BUCKET_INCICLE_SECRET_ACCESS_KEY: string;
      VITE_APP_AWS_BUCKET_INCICLE_REGION: string;

      // Projects
      VITE_APP_AWS_BUCKET_BUCKET_PROJECTS_NAME: string;
      VITE_APP_AWS_BUCKET_PROJECTS_ACCESS_KEY_ID: string;
      VITE_APP_AWS_BUCKET_PROJECTS_SECRET_ACCESS_KEY: string;
      VITE_APP_AWS_BUCKET_PROJECTS_REGION: string;

      VITE_APP_SECRET_KEY: string;
      VITE_APP_PRODUCTION: string;
    }
  }
}
