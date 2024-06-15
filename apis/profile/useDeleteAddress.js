import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useDeleteAddress = () => {
   const { mutate } = useSWRConfig();

   return useSWRMutation('accounts/address/get_update_delete/', (url, data) =>
      axiosInstance
         .delete(url, {
            params: {
               pk: data.arg,
            },
         })
         .then(res => {
            mutate('accounts/address/list_create/', prevData => {
               const newData = prevData?.filter(item => item?.id !== data?.arg);
               return newData;
            });
            return res.data;
         })
   );
};

export default useDeleteAddress;
