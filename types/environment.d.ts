export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string;
      REACT_APP_AUTHENTICATE: string;

      // API
      REACT_APP_API_URL_SOCIAL_NETWORK: string;
      REACT_APP_API_URL_PROJECTS: string;
      REACT_APP_API_URL_SCHEDULE: string;
      REACT_APP_API_V1_URL_NOTIFICATIONS: string;
      REACT_APP_API_V2_URL_NOTIFICATIONS: string;
      REACT_APP_API_URL_CORE: string;
      REACT_APP_API_URL_EVALUATION: string;
      REACT_APP_API_URL_PD: string;
      REACT_APP_API_URL_OB: string;

      // WEB
      REACT_APP_WEB_URL_SOCIAL_NETWORK: string;
      REACT_APP_WEB_URL_PROJECTS: string;
      REACT_APP_WEB_URL_SCHEDULE: string;
      REACT_APP_WEB_URL_CORE: string;
      REACT_APP_WEB_URL_EVALUATION: string;
      REACT_APP_WEB_URL_PD: string;
      REACT_APP_WEB_URL_POLICY: string;
      REACT_APP_WEB_URL_OKR: string;
      REACT_APP_WEB_URL_DEPARTMENT: string;

      // AWS
      // Incicle
      REACT_APP_AWS_BUCKET_INCICLE_BUCKET_NAME: string;
      REACT_APP_AWS_BUCKET_INCICLE_ACCESS_KEY_ID: string;
      REACT_APP_AWS_BUCKET_INCICLE_SECRET_ACCESS_KEY: string;
      REACT_APP_AWS_BUCKET_INCICLE_REGION: string;

      // Projects
      REACT_APP_AWS_BUCKET_BUCKET_PROJECTS_NAME: string;
      REACT_APP_AWS_BUCKET_PROJECTS_ACCESS_KEY_ID: string;
      REACT_APP_AWS_BUCKET_PROJECTS_SECRET_ACCESS_KEY: string;
      REACT_APP_AWS_BUCKET_PROJECTS_REGION: string;

      REACT_APP_SECRET_KEY: string;
      REACT_APP_PRODUCTION: string;
    }
  }
}
