import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from '../../features/auth/ProtectedRoute/ProtectedRoute';
import { PublicOnlyRoute } from '../../features/auth/PublicOnlyRoute/PublicOnlyRoute';
import { MainLayout } from '../../widgets/layout/MainLayout/MainLayout';

const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../../pages/RegisterPage/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const DashboardPage = lazy(() => import('../../pages/DashboardPage/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const ProductsPage = lazy(() => import('../../pages/ProductsPage/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() =>
  import('../../pages/ProductDetailPage/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const ProfilePage = lazy(() => import('../../pages/ProfilePage/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('../../pages/SettingsPage/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const LogoutPage = lazy(() => import('../../pages/LogoutPage/LogoutPage').then((m) => ({ default: m.LogoutPage })));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

function LazyRoute({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LazyRoute>
          <LoginPage />
        </LazyRoute>
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnlyRoute>
        <LazyRoute>
          <RegisterPage />
        </LazyRoute>
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <LazyRoute><DashboardPage /></LazyRoute> },
      { path: 'products', element: <LazyRoute><ProductsPage /></LazyRoute> },
      { path: 'products/:id', element: <LazyRoute><ProductDetailPage /></LazyRoute> },
      { path: 'profile', element: <LazyRoute><ProfilePage /></LazyRoute> },
      { path: 'settings', element: <LazyRoute><SettingsPage /></LazyRoute> },
      { path: 'logout', element: <LazyRoute><LogoutPage /></LazyRoute> },
      { path: '*', element: <LazyRoute><NotFoundPage /></LazyRoute> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
