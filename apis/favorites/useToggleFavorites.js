import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useToggleFavorites = () => {
   const { mutate } = useSWRConfig();

   return useSWRMutation('store/favorite-product/list_create/', (url, data) =>
      axiosInstance
         .post(
            url,
            {},
            {
               params: {
                  product_id: data.arg,
               },
            }
         )
         .then(res => {
            mutate('store/favorite-product/list_create/', res.data?.favorite_products);
            return res.data;
         })
   );
};

export default useToggleFavorites;
