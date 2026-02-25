import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../../../app/api/authApi';

const initialForm = { username: '', password: '' };

export function LoginForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!form.username.trim() || !form.password.trim()) {
        setError(t('auth.errors.required'));
        return;
      }
      try {
        await login({
          username: form.username.trim(),
          password: form.password,
        }).unwrap();
        const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';
        navigate(from, { replace: true });
      } catch (err) {
        const message =
          err && typeof err === 'object' && 'data' in err
            ? String((err as { data?: { message?: string } }).data?.message ?? t('auth.errors.invalidCredentials'))
            : t('auth.errors.networkError');
        setError(message);
      }
    },
    [form, login, navigate, location.state, t]
  );

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'var(--error-color, #c00)', marginBottom: 8 }}>{error}</p>}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="username">{t('auth.username')}</label>
        <br />
        <input
          id="username"
          type="text"
          value={form.username}
          onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
          disabled={isLoading}
          autoComplete="username"
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="password">{t('auth.password')}</label>
        <br />
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          disabled={isLoading}
          autoComplete="current-password"
          style={{ width: '100%', padding: 8, marginTop: 4 }}
        />
      </div>
      <button type="submit" disabled={isLoading} style={{ padding: '8px 16px' }}>
        {isLoading ? '...' : t('auth.submit')}
      </button>
    </form>
  );
}
