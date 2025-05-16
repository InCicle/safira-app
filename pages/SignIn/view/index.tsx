import { FC, FormEvent } from 'react';
import logoImg from '@/safira-app/assets/lock_login.png';
import { Input } from '@/safira-app/pages/SignIn/components/Input';
import Button from '@/safira-app/pages/SignIn/components/Button';
import { Link } from 'react-router-dom';
import { Background, Container, Content, AnimationContainer } from '@/safira-app/pages/SignIn/components/styles';
import { Mail, Lock, Login } from '@mui/icons-material';
import { UseFormRegister } from 'react-hook-form';
import { SignInFormInputs } from '../controller';

interface SignInViewProps {
  loading: boolean;
  isLoginPage: boolean;
  handleSubmit: (event: FormEvent) => void;
  currentLanguage: string;
  t: (key: string) => string;
  register: UseFormRegister<SignInFormInputs>;
}

export const SignInView: FC<SignInViewProps> = ({
  currentLanguage,
  handleSubmit,
  loading,
  isLoginPage,
  t,
  register,
}) => {
  return (
    <Container>
      <Background flexShrink={isLoginPage ? 0.7 : 1.0} />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit}>
            <img src={logoImg} alt="logo" style={{ width: 100, height: 140 }} />

            <h2>{t('login_page.system_access')}</h2>

            <Input name="email" label="" type="email" icon={Mail} />

            <Input
              {...register('password', { required: t('login_page.password_required') })}
              label={t('login_page.password')}
              type="password"
              icon={Lock}
            />

            <Link to="/forgot">{t('login_page.forgot_password')}</Link>

            <Button loading={loading} disabled={loading} type="submit">
              {t('login_page.enter')}
            </Button>
          </form>

          <a href={currentLanguage === 'pt' ? 'https://www.incicle.com/cadastro' : 'https://www.incicle.com/register'}>
            <Login />
            {t('login_page.create_account')}
          </a>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
