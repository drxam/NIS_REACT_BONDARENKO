import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { selectTheme, selectLocale, selectProductsPageSize } from '../../../app/store/selectors';
import { setTheme, setLocale, setProductsPageSize } from '../../../app/store/settingsSlice';
import type { Theme, Locale } from '../../../app/store/settingsSlice';

const PAGE_SIZES = [5, 10, 20, 30];

export function SettingsPanel() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const locale = useAppSelector(selectLocale);
  const pageSize = useAppSelector(selectProductsPageSize);

  const handleThemeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setTheme(e.target.value as Theme));
    },
    [dispatch]
  );

  const handleLocaleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setLocale(e.target.value as Locale));
    },
    [dispatch]
  );

  const handlePageSizeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setProductsPageSize(Number(e.target.value)));
    },
    [dispatch]
  );

  return (
    <div>
      <h1>{t('settings.title')}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        <div>
          <label htmlFor="lang">{t('settings.language')}</label>
          <br />
          <select id="lang" value={locale} onChange={handleLocaleChange} style={{ padding: 8, marginTop: 4, minWidth: 120 }}>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>
        <div>
          <label htmlFor="theme">{t('settings.theme')}</label>
          <br />
          <select id="theme" value={theme} onChange={handleThemeChange} style={{ padding: 8, marginTop: 4, minWidth: 120 }}>
            <option value="light">{t('settings.light')}</option>
            <option value="dark">{t('settings.dark')}</option>
          </select>
        </div>
        <div>
          <label htmlFor="pageSize">{t('settings.pageSize')}</label>
          <br />
          <select id="pageSize" value={pageSize} onChange={handlePageSizeChange} style={{ padding: 8, marginTop: 4, minWidth: 120 }}>
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
