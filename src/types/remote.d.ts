declare module 'project-shell/contexts/AuthContext' {
  import { Provider } from 'react';
  const AuthProvider: Provider;

  export default AuthProvider;
}

declare module 'project-shell/contexts/ProfileContext' {
  import { Provider } from 'react';

  const ProfileProvider: Provider;
  export default ProfileProvider;
}
