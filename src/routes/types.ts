import { JSX } from 'react';
import { RouteObject } from 'react-router';

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
