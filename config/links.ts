export type ModulesApi = {
  core: string;
  social: string;
  schedule: string;
  project: string;
  evaluation: string;
  notification: string;
  personal_department: string;
  ombudsman: string;
};

export type ModulesWeb = {
  core: string;
  social: string;
  schedule: string;
  project: string;
  evaluation: string;
  personal_department: string;
  policy: string;
  okr: string;
  department: string;
  settings: string;
  manager: string;
  incheck: string;
};

export type AwsUrl = {
  bucket: string;
  access_key_id: string;
  secret_access_key: string;
  region: string;
};

export type Modulelinks = {
  web: ModulesWeb;
  api: ModulesApi;
  aws: AwsUrl;
  aws_project: AwsUrl;
  production: boolean;
  secret_key: string;
};

export const links: Modulelinks = {
  api: {
    core: import.meta.env.VITE_APP_API_URL_CORE,
    evaluation: import.meta.env.VITE_APP_API_URL_EVALUATION,
    notification: import.meta.env.VITE_APP_API_URL_NOTIFICATIONS,
    personal_department: import.meta.env.VITE_APP_API_URL_PD,
    project: import.meta.env.VITE_APP_API_URL_PROJECTS,
    schedule: import.meta.env.VITE_APP_API_URL_SCHEDULE,
    social: import.meta.env.VITE_APP_API_URL_SOCIAL_NETWORK,
    ombudsman: import.meta.env.VITE_APP_API_URL_OB,
  },
  web: {
    core: import.meta.env.VITE_APP_WEB_URL_CORE,
    evaluation: import.meta.env.VITE_APP_WEB_URL_EVALUATION,
    personal_department: import.meta.env.VITE_APP_WEB_URL_PD,
    project: import.meta.env.VITE_APP_WEB_URL_PROJECTS,
    schedule: import.meta.env.VITE_APP_WEB_URL_SCHEDULE,
    social: import.meta.env.VITE_APP_WEB_URL_SOCIAL_NETWORK!,
    policy: import.meta.env.VITE_APP_WEB_URL_POLICY!,
    okr: import.meta.env.VITE_APP_WEB_URL_OKR,
    department: import.meta.env.VITE_APP_WEB_URL_DEPARTMENT,
    settings: import.meta.env.VITE_APP_WEB_URL_SETTINGS!,
    manager: import.meta.env.VITE_APP_WEB_URL_MANAGER!,
    incheck: import.meta.env.VITE_APP_WEB_URL_INCHECK!,
  },
  aws: {
    access_key_id: import.meta.env.VITE_APP_AWS_BUCKET_INCICLE_ACCESS_KEY_ID,
    bucket: import.meta.env.VITE_APP_AWS_BUCKET_INCICLE_BUCKET_NAME,
    region: import.meta.env.VITE_APP_AWS_BUCKET_INCICLE_REGION,
    secret_access_key: import.meta.env.VITE_APP_AWS_BUCKET_INCICLE_SECRET_ACCESS_KEY,
  },
  aws_project: {
    access_key_id: import.meta.env.VITE_APP_AWS_BUCKET_PROJECTS_ACCESS_KEY_ID,
    bucket: import.meta.env.VITE_APP_AWS_BUCKET_BUCKET_PROJECTS_NAME,
    region: import.meta.env.VITE_APP_AWS_BUCKET_PROJECTS_REGION,
    secret_access_key: import.meta.env.VITE_APP_AWS_BUCKET_PROJECTS_SECRET_ACCESS_KEY,
  },
  production: JSON.parse(import.meta.env.VITE_APP_PRODUCTION),
  secret_key: import.meta.env.VITE_APP_SECRET_KEY,
};
