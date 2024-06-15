import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useDeleteCode = () =>
   useSWRMutation('store/discount-code/get_update_delete/', (url, data) =>
      axiosInstance
         .delete(url, {
            params: {
               pk: data.arg,
            },
         })
         .then(res => res.data)
   );

export default useDeleteCode;
