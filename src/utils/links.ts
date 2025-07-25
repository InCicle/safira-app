export type ModulesApi = {
  core: string;
  social: string;
  schedule: string;
  project: string;
  evaluation: string;
  notifications_v1: string;
  notifications_v2: string;
  personal_department: string;
  ombudsman: string;
  auth: string;
  base: string;
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
  ombudsman: string;
  hrconnect: string;
  survey: string;
  task_manager: string;
  group: string;
  endomarketing: string;
  feedback: string;
  profile_map: string;
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
    personal_department: import.meta.env.VITE_APP_API_URL_PD,
    project: import.meta.env.VITE_APP_API_URL_PROJECTS,
    schedule: import.meta.env.VITE_APP_API_URL_SCHEDULE,
    social: import.meta.env.VITE_APP_API_URL_SOCIAL_NETWORK,
    ombudsman: import.meta.env.VITE_APP_API_URL_OB,
    notifications_v1: import.meta.env.VITE_APP_API_V1_URL_NOTIFICATIONS,
    notifications_v2: import.meta.env.VITE_APP_API_V2_URL_NOTIFICATIONS,
    auth: import.meta.env.VITE_APP_API_URL_AUTHENTICATE,
    base: import.meta.env.VITE_APP_API_URL,
  },
  web: {
    core: import.meta.env.VITE_APP_WEB_URL_CORE,
    evaluation: import.meta.env.VITE_APP_WEB_URL_EVALUATION,
    personal_department: import.meta.env.VITE_APP_WEB_URL_PD,
    project: import.meta.env.VITE_APP_WEB_URL_PROJECTS,
    schedule: import.meta.env.VITE_APP_WEB_URL_SCHEDULE,
    task_manager: import.meta.env.VITE_APP_WEB_URL_TASK_MANAGER,
    social: import.meta.env.VITE_APP_WEB_URL_SOCIAL_NETWORK,
    policy: import.meta.env.VITE_APP_WEB_URL_POLICY,
    okr: import.meta.env.VITE_APP_WEB_URL_OKR,
    department: import.meta.env.VITE_APP_WEB_URL_DEPARTMENT,
    settings: import.meta.env.VITE_APP_WEB_URL_SETTINGS,
    manager: import.meta.env.VITE_APP_WEB_URL_MANAGER,
    incheck: import.meta.env.VITE_APP_WEB_URL_INCHECK,
    ombudsman: import.meta.env.VITE_APP_WEB_URL_OMBUDSMAN,
    hrconnect: import.meta.env.VITE_APP_WEB_URL_HRCONNECTION,
    survey: import.meta.env.VITE_APP_WEB_URL_SURVEY,
    group: import.meta.env.VITE_APP_WEB_URL_GROUP,
    feedback: import.meta.env.VITE_APP_WEB_URL_FEEDBACK,
    endomarketing: import.meta.env.VITE_APP_WEB_URL_ENDOMARKETING,
    profile_map: import.meta.env.VITE_APP_WEB_URL_PROFILE_MAP,
  },
  aws: {
    bucket: import.meta.env.VITE_APP_S3_BUCKET_INCICLE,
    region: import.meta.env.VITE_APP_S3_REGION_INCICLE,
    access_key_id: import.meta.env.VITE_APP_S3_ACCESS_KEY_ID_INCICLE,
    secret_access_key: import.meta.env.VITE_APP_S3_SECRET_ACCESS_KEY_INCICLE,
  },
  aws_project: {
    bucket: import.meta.env.VITE_APP_S3_BUCKET_PROJECTS,
    region: import.meta.env.VITE_APP_S3_REGION_PROJECTS,
    access_key_id: import.meta.env.VITE_APP_S3_ACCESS_KEY_ID_PROJECTS,
    secret_access_key: import.meta.env
      .VITE_APP_APP_S3_SECRET_ACCESS_KEY_PROJECTS,
  },
  production: import.meta.env.VITE_APP_ENV === 'production',
  secret_key: import.meta.env.VITE_APP_SECRET_KEY,
};
