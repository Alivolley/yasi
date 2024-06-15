import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useDeleteBasket = () => {
   const { mutate } = useSWRConfig();
   return useSWRMutation('store/cart/empty/', url =>
      axiosInstance.post(url).then(() => mutate('store/cart/get_update/'))
   );
};

export default useDeleteBasket;
