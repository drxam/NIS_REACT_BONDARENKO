import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', labelKey: 'nav.dashboard' },
  { to: '/products', labelKey: 'nav.products' },
  { to: '/profile', labelKey: 'nav.profile' },
  { to: '/settings', labelKey: 'nav.settings' },
] as const;

export function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <aside
      style={{
        width: 200,
        padding: 24,
        borderRight: '1px solid var(--border-color, #eee)',
        minHeight: 'calc(100vh - 52px)',
      }}
    >
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {navItems.map(({ to, labelKey }) => (
          <Link
            key={to}
            to={to}
            style={{
              padding: 8,
              textDecoration: 'none',
              color: location.pathname === to ? 'var(--primary-color, #09f)' : 'inherit',
              fontWeight: location.pathname === to ? 600 : 400,
            }}
          >
            {t(labelKey)}
          </Link>
        ))}
        <Link to="/logout" style={{ padding: 8, textDecoration: 'none', marginTop: 16 }}>
          {t('nav.logout')}
        </Link>
      </nav>
    </aside>
  );
}
