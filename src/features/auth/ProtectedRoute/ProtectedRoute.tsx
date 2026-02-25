import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../app/store/hooks';
import { selectIsAuthenticated, selectAuthInitialized } from '../../../app/store/selectors';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { t } = useTranslation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectAuthInitialized);
  const location = useLocation();

  if (!isInitialized) {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        {t('common.loading')}
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
