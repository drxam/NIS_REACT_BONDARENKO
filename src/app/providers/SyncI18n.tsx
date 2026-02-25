import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectLocale } from '../store/selectors';
import i18n from 'i18next';

export function SyncI18n() {
  const locale = useAppSelector(selectLocale);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return null;
}
