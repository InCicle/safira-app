export {};

declare global {
    interface ImportMetaEnv {
      readonly VITE_APP_API_URL: string;
      readonly VITE_APP_AUTHENTICATE: string;

      // API
      readonly VITE_APP_API_URL_SOCIAL_NETWORK: string;
      readonly VITE_APP_API_URL_PROJECTS: string;
      readonly VITE_APP_API_URL_SCHEDULE: string;
      readonly VITE_APP_API_URL_CORE: string;
      readonly VITE_APP_API_URL_EVALUATION: string;
      readonly VITE_APP_API_URL_PD: string;
      readonly VITE_APP_API_URL_OB: string;
      readonly VITE_APP_API_V1_URL_NOTIFICATIONS: string;
      readonly VITE_APP_API_V2_URL_NOTIFICATIONS: string;

      // WEB
      readonly VITE_APP_WEB_URL_SOCIAL_NETWORK: string;
      readonly VITE_APP_WEB_URL_PROJECTS: string;
      readonly VITE_APP_WEB_URL_SCHEDULE: string;
      readonly VITE_APP_WEB_URL_CORE: string;
      readonly VITE_APP_WEB_URL_EVALUATION: string;
      readonly VITE_APP_WEB_URL_PD: string;
      readonly VITE_APP_WEB_URL_POLICY: string;
      readonly VITE_APP_WEB_URL_OKR: string;
      readonly VITE_APP_WEB_URL_DEPARTMENT: string;

      // AWS
      // Incicle
      readonly VITE_APP_AWS_BUCKET_INCICLE_BUCKET_NAME: string;
      readonly VITE_APP_AWS_BUCKET_INCICLE_ACCESS_KEY_ID: string;
      readonly VITE_APP_AWS_BUCKET_INCICLE_SECRET_ACCESS_KEY: string;
      readonly VITE_APP_AWS_BUCKET_INCICLE_REGION: string;

      // Projects
      readonly VITE_APP_AWS_BUCKET_BUCKET_PROJECTS_NAME: string;
      readonly VITE_APP_AWS_BUCKET_PROJECTS_ACCESS_KEY_ID: string;
      readonly VITE_APP_AWS_BUCKET_PROJECTS_SECRET_ACCESS_KEY: string;
      readonly VITE_APP_AWS_BUCKET_PROJECTS_REGION: string;

      readonly VITE_APP_ENV: string;
    }
}
