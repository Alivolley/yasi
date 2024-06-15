import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useBlockUser = () =>
   useSWRMutation('accounts/user-block/', (url, data) => axiosInstance.patch(url, data.arg).then(res => res.data));

export default useBlockUser;
