import { useCallback, useState, useMemo, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/safira-app/hooks/useAuth';
import { useURLQuery } from '@/safira-app/hooks/useURLQuery';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';
import api from '@/services/api';
import { updateOneSignalUser } from '@/safira-app/utils/onesignal';
import { encode } from '@/safira-app/utils/crypto';
import { links } from '@/safira-app/config/links';
import { addToast } from '@/safira-app/components/Toast';
import { SignInView } from '@/safira-app/pages/SignIn/view';
import { useNavigate } from 'react-router-dom';
import { domainName } from '@/safira-app/utils/domainName';

export interface SignInFormInputs {
  email: string;
  password: string;
}

const isLoginPage = window.location.pathname === '/signin';
const socialNetworkUrl = import.meta.env.VITE_APP_WEB_URL_SOCIAL_NETWORK || '';

export const SignInController = () => {
  const { user, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const query = useURLQuery();
  const navigate = useNavigate();
  const currentLanguage = i18n.language.split('-')[0];

  const schema = Yup.object().shape({
    email: Yup.string().required(t('login_page.email_required')).email(t('login_page.invalid_email')),
    password: Yup.string().required(t('login_page.password_required')),
  });

  const { register, handleSubmit: handleFormSubmit } = useForm<SignInFormInputs>({
    resolver: yupResolver(schema),
  });

  const signIn = useCallback(async ({ email, password }: SignInFormInputs) => {
    const response = await api.post(`${import.meta.env.VITE_APP_AUTHENTICATE}/authenticate`, {
      email,
      password,
    });

    const userConfig: any = jwtDecode(response.data.access_token);
    const { user } = userConfig;

    const oneSignalId = Cookies.get('onesignal_push_id');

    if (oneSignalId && links.production) {
      await updateOneSignalUser(oneSignalId, user.id);
    }

    const { access_token, expires_in } = response.data;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 320);

    window.localStorage.setItem('authToken', String(encode(access_token)));
    Cookies.set('authToken', encode(access_token), {
      domain: domainName,
      secure: true,
      expires: expirationDate,
    });

    window.localStorage.setItem('expiresIn', String(encode(expires_in.toString())));
    Cookies.set('expiresIn', encode(expires_in.toString()), {
      domain: domainName,
      secure: true,
      expires: expirationDate,
    });

    window.localStorage.setItem('user', String(encode(JSON.stringify(user))));

    Cookies.set('user', encode(JSON.stringify(user)), {
      domain: domainName,
      secure: true,
      expires: expirationDate,
    });

    const firstAccess = response.data.first_access;
    if (firstAccess) {
      Cookies.set('first_access', firstAccess, {
        domain: domainName,
        secure: true,
        expires: expirationDate,
      });
    }
  }, []);

  const routeToRedirect = useMemo(() => {
    const url = query.get('redirect_to');

    if (url) {
      const rule = /[h][t]{2}[p]s?[:][/]{2}/;
      const protocol = /^https:\/\//.test(socialNetworkUrl) ? 'https' : 'http';
      const urlToRedirect = `${protocol}://${url.replace(rule, '')}`;
      return urlToRedirect;
    }

    return socialNetworkUrl;
  }, []); // eslint-disable-line

  const onSubmit: SubmitHandler<SignInFormInputs> = useCallback(
    async data => {
      setLoading(true);

      try {
        await signIn(data);

        if (data.email === 'inciclecompany@incicle.com') {
          return (window.location.href = `https://admin.${domainName}`);
        }

        return routeToRedirect.slice(0, 4) === 'http'
          ? window.location.replace(routeToRedirect)
          : (window.location.href = routeToRedirect);
      } catch (err: any) {
        console.log(err);
        if (err?.response?.status === 409) {
          return navigate(`/unverified-user/${data.email}`);
        }

        if (err?.response?.status === 500) {
          return addToast(
            (t('login_page.errors.authentication_title'), t('login_page.errors.authentication_description')),
            {
              appearance: 'error',
            },
          );
        }

        if (err?.response?.status === 401) {
          return addToast((t('login_page.errors.authentication_title'), t('login_page.errors.invalid_credentials')), {
            appearance: 'error',
          });
        }

        addToast((t('login_page.errors.authentication_title'), t('login_page.errors.invalid_credentials')), {
          appearance: 'error',
        });
      } finally {
        setLoading(false);
      }
    },
    [signIn, routeToRedirect, navigate, t],
  );

  useEffect(() => {
    const newSession = query.get('session');

    if (newSession && newSession === 'new') {
      signOut();
    }

    if (user && !newSession) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 320);

      const encodedStoredToken = window.localStorage.getItem('authToken');
      const encodedStoredExpiresIn = window.localStorage.getItem('expiresIn');
      const encodedStoredUser = window.localStorage.getItem('user');

      if (encodedStoredToken && encodedStoredExpiresIn && encodedStoredUser) {
        Cookies.set('authToken', encodedStoredToken, {
          domain: domainName,
          secure: true,
          expires: expirationDate,
        });

        Cookies.set('expiresIn', encodedStoredExpiresIn, {
          domain: domainName,
          secure: true,
          expires: expirationDate,
        });

        Cookies.set('user', encodedStoredUser, {
          domain: domainName,
          secure: true,
          expires: expirationDate,
        });
      }

      window.location.href = routeToRedirect;
    }
  }, []); // eslint-disable-line

  return (
    <SignInView
      t={t}
      loading={loading}
      isLoginPage={isLoginPage}
      handleSubmit={handleFormSubmit(onSubmit)}
      currentLanguage={currentLanguage}
      register={register}
    />
  );
};
