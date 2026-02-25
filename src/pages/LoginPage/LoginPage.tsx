import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LoginForm } from '../../features/auth/LoginForm/LoginForm';

export function LoginPage() {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: 400, margin: '48px auto', padding: 24 }}>
      <h1>{t('auth.login')}</h1>
      <LoginForm />
      <p style={{ marginTop: 16 }}>
        {t('auth.noAccount')} <Link to="/register">{t('auth.registerLink')}</Link>
      </p>
    </div>
  );
}
