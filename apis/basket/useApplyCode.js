import { toast } from 'react-toastify';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useApplyCode = closeDiscountModalHandler => {
   const { mutate } = useSWRConfig();

   return useSWRMutation('store/cart/get_update/', (url, data) =>
      axiosInstance
         .patch(
            url,
            {},
            {
               params: {
                  discount_code: data.arg,
               },
            }
         )
         .then(res => {
            mutate('store/cart/get_update/', res.data);
            if (res.status === 200) {
               closeDiscountModalHandler();
               toast.success('کد با موفقیت اعمال شد', {
                  style: {
                     direction: 'rtl',
                     fontFamily: 'dana',
                     lineHeight: '25px',
                  },
                  theme: 'colored',
                  autoClose: 5000,
               });
            }
            return res.data;
         })
         .catch(err => {
            if (err?.response?.status === 400) {
               toast.error('کد وارد شده معتبر نیست', {
                  style: {
                     direction: 'rtl',
                     fontFamily: 'dana',
                     lineHeight: '25px',
                  },
                  theme: 'colored',
                  autoClose: 5000,
               });
            }
         })
   );
};

export default useApplyCode;
