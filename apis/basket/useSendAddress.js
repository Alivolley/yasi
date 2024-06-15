import { useRouter } from 'next/router';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useSendAddress = () => {
   const { mutate } = useSWRConfig();
   const { push } = useRouter();

   return useSWRMutation('store/cart/get_update/', (url, data) =>
      axiosInstance.patch(url, data.arg).then(res => {
         axiosInstance('accounts/payment').then(innerRes => {
            if (innerRes?.data?.url) {
               push(innerRes?.data?.url);
            }
            mutate('store/cart/get_update/', res.data);
         });
         return res.data;
      })
   );
};

export default useSendAddress;
