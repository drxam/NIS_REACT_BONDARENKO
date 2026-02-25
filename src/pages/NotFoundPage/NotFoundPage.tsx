import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div style={{ textAlign: 'center', padding: 48 }}>
      <h1>{t('errors.notFound')}</h1>
      <p>{t('errors.notFoundDescription')}</p>
      <Link to="/">Go to Dashboard</Link>
    </div>
  );
}
