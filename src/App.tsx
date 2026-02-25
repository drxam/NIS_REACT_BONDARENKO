import { AppProviders } from './app/providers/AppProviders';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { SyncI18n } from './app/providers/SyncI18n';
import { AuthInit } from './features/auth/initAuth/AuthInit';
import { ErrorBoundary } from './shared/ui/ErrorBoundary/ErrorBoundary';
import { AppRouter } from './app/router';

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <ThemeProvider>
          <SyncI18n />
          <AuthInit />
          <AppRouter />
        </ThemeProvider>
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
