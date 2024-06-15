import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useAddAddress = userId => {
   const { mutate } = useSWRConfig();

   return useSWRMutation('accounts/address/list_create/', (url, data) => {
      const adminData = { ...data.arg, user: userId };

      return axiosInstance.post(url, userId ? adminData : data.arg).then(res => {
         // eslint-disable-next-line consistent-return
         mutate('accounts/address/list_create/', prevData => {
            if (prevData) {
               const newData = [...prevData, res.data];
               return newData;
            }
         });
         return res.data;
      });
   });
};

export default useAddAddress;
