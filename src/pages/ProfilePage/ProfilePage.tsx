import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../app/store/hooks';
import { selectAuthUser } from '../../app/store/selectors';
import { LogoutButton } from '../../features/auth/LogoutButton/LogoutButton';

export function ProfilePage() {
  const { t } = useTranslation();
  const user = useAppSelector(selectAuthUser);

  if (!user) return null;

  return (
    <div>
      <h1>{t('profile.title')}</h1>
      <p><strong>{t('profile.name')}:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>{t('profile.email')}</strong>: {user.email}</p>
      <p><strong>{t('profile.username')}</strong>: {user.username}</p>
      <LogoutButton />
    </div>
  );
}
