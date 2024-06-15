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
               toast.success('کد با موفقیت اعمال شد');
            }
            return res.data;
         })
         .catch(err => {
            if (err?.response?.status === 400) {
               toast.error('کد وارد شده معتبر نیست');
            }
         })
   );
};

export default useApplyCode;
