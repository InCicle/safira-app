import { Suspense, lazy } from 'react';

import {
  __federation_method_getRemote,
  __federation_method_setRemote,
  // @ts-expect-error no types for __federation__
} from 'virtual:__federation__';
import { LoadingComponent } from './LoadingComponent';

interface RemoteLoaderProps {
  url: string;
  name: string;
  module: string;
  format?: 'esm' | 'cjs';
  from?: 'vite' | 'webpack';
}

function loadRemoteModule({ url, name, module, format = 'esm', from = 'vite' }: RemoteLoaderProps) {
  __federation_method_setRemote(name, {
    url: () => Promise.resolve(url),
    format,
    from,
  });

  return __federation_method_getRemote(name, module);
}
export const RemoteLoader = (props: RemoteLoaderProps) => {
  const RemoteComponent = lazy(() => loadRemoteModule(props));

  return (
    <Suspense fallback={<LoadingComponent />}>
      <RemoteComponent />
    </Suspense>
  );
};
