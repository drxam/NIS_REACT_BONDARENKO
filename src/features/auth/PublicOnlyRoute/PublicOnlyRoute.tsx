import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/hooks';
import { selectIsAuthenticated, selectAuthInitialized } from '../../../app/store/selectors';

interface PublicOnlyRouteProps {
  children: ReactNode;
}

export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { t } = useTranslation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectAuthInitialized);

  if (!isInitialized) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        {t('common.loading')}
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
