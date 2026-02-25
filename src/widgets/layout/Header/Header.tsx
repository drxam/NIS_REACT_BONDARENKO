import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/hooks';
import { selectAuthUser } from '../../../app/store/selectors';

export function Header() {
  const { t } = useTranslation();
  const user = useAppSelector(selectAuthUser);

  return (
    <header
      style={{
        padding: '12px 24px',
        borderBottom: '1px solid var(--border-color, #eee)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <nav style={{ display: 'flex', gap: 16 }}>
        <Link to="/">{t('nav.dashboard')}</Link>
        <Link to="/products">{t('nav.products')}</Link>
        <Link to="/profile">{t('nav.profile')}</Link>
        <Link to="/settings">{t('nav.settings')}</Link>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {user && <span>{user.firstName} {user.lastName}</span>}
        <Link to="/logout">{t('nav.logout')}</Link>
      </div>
    </header>
  );
}
