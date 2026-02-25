import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store/hooks';
import { logout } from '../../../app/store/authSlice';

export function LogoutButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <button type="button" onClick={handleClick} style={{ marginTop: 16, padding: '8px 16px' }}>
      {t('nav.logout')}
    </button>
  );
}
