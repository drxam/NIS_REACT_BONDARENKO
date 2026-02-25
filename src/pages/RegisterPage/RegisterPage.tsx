import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function RegisterPage() {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: 560, margin: '48px auto', padding: 24 }}>
      <h1>{t('register.title')}</h1>
      <p>{t('register.stub')}</p>
      <Link to="/login">{t('register.backToLogin')}</Link>
    </div>
  );
}
