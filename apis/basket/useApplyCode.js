import { toast } from 'react-toastify';
import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import { useTranslations } from 'next-intl';
import axiosInstance from '@/configs/axiosInstance';

const useApplyCode = closeDiscountModalHandler => {
   const { mutate } = useSWRConfig();
   const t = useTranslations('basket');

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
               toast.success(t('Code registered successfully'), {
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
               toast.error(t('Code is not valid'), {
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
