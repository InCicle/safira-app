import { JSX } from 'react';
import { RouteObject } from 'react-router';

export const routesPaths = {
  DEFAULT: '/',
  HOME: '/home',
  PERSON_HOME: '/person/home',
  NOT_FOUND: '/*',
  SOCIAL: '/social',
};

export type PageProps = {
  path?: string;
  permissions?: string[];
};

export type RouteType = {
  path: string;
  element?: JSX.Element;
  options?: Omit<RouteObject, 'path' | 'element' | 'children'>;
  permissions?: string[] | (string | string[])[];
  children?: RouteType[];
};
