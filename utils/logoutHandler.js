import Cookies from 'js-cookie';
import axiosInstance from '@/configs/axiosInstance';

const logoutHandler = () => {
   axiosInstance
      .post('accounts/logout/', {
         refresh: Cookies.get('yasi_refreshToken'),
      })
      .then(() => {
         Cookies.remove('yasi_accessToken');
         Cookies.remove('yasi_refreshToken');
         Cookies.remove('yasi_isLogin');
         window.location.reload();
      });
};

export default logoutHandler;
