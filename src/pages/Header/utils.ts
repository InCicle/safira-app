export const RedirectType = {
  STEPONE: 1,
  INPOINT: 2,
  RECRUITMENT: 3,
};
export type RedirectTypeEnum = (typeof RedirectType)[keyof typeof RedirectType];

export const moduleRedirectType = {
  in_point: RedirectType.INPOINT,
  recruitment: RedirectType.RECRUITMENT,
  corporative_university: RedirectType.STEPONE,
} as const;

export const integrationTitles = ['corporative_university', 'in_point', 'recruitment'];
