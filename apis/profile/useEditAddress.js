import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useEditAddress = () => {
   const { mutate } = useSWRConfig();
   return useSWRMutation('accounts/address/get_update_delete/', (url, data) =>
      axiosInstance
         .patch(url, data.arg?.newAddress, {
            params: {
               pk: data.arg?.addressId,
            },
         })
         .then(res => {
            // eslint-disable-next-line consistent-return
            mutate('accounts/address/list_create/', prevData => {
               if (prevData) {
                  const newData = prevData?.filter(item => item?.id !== data.arg?.addressId);
                  newData.push(res.data);
                  return newData;
               }
            });
            return res.data;
         })
   );
};

export default useEditAddress;
