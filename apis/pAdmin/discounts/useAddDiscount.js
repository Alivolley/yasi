import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useAddDiscount = () =>
   useSWRMutation('store/discount-code/list_create/', (url, data) =>
      axiosInstance.post(url, data.arg).then(res => res.data)
   );

export default useAddDiscount;
