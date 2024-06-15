import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useAddUser = () =>
   useSWRMutation('accounts/permissions/', (url, data) => axiosInstance.patch(url, data.arg).then(res => res.data));

export default useAddUser;
