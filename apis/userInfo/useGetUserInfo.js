import useSWR from 'swr';

// Redux
import { useDispatch } from 'react-redux';
import { addUserInfo } from '@/store/reducers/userInfoReducer';

// Configs
import axiosInstance from '@/configs/axiosInstance';

const useGetUserInfo = isLogin => {
   const dispatch = useDispatch();

   return useSWR(isLogin ? 'accounts/panel/' : null, url =>
      axiosInstance(url).then(res => {
         dispatch(addUserInfo(res.data));
      })
   );
};

export default useGetUserInfo;
