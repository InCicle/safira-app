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
    readonly VITE_APP_WEB_URL_TASK_MANAGER: string;
    readonly VITE_APP_WEB_URL_SETTINGS: string;
    readonly VITE_APP_WEB_URL_MANAGER: string;
    readonly VITE_APP_WEB_URL_INCHECK: string;
    readonly VITE_APP_WEB_URL_OMBUDSMAN: string;
    readonly VITE_APP_WEB_URL_HRCONNECTION: string;
    readonly VITE_APP_WEB_URL_SURVEY: string;
    readonly VITE_APP_WEB_URL_GROUP: string;
    readonly VITE_APP_WEB_URL_FEEDBACK: string;
    readonly VITE_APP_WEB_URL_ENDOMARKETING: string;

    // AWS
    // Incicle
    readonly VITE_APP_S3_BUCKET_INCICLE: string;
    readonly VITE_APP_S3_REGION_INCICLE: string;
    readonly VITE_APP_S3_ACCESS_KEY_ID_INCICLE: string;
    readonly VITE_APP_S3_SECRET_ACCESS_KEY_INCICLE: string;

    // Projects
    readonly VITE_APP_S3_BUCKET_PROJECTS: string;
    readonly VITE_APP_S3_REGION_PROJECTS: string;
    readonly VITE_APP_S3_ACCESS_KEY_ID_PROJECTS: string;
    readonly VITE_APP_S3_SECRET_ACCESS_KEY_PROJECTS: string;

    readonly VITE_APP_ENV: 'development' | 'production' | 'staging';
  }
}
