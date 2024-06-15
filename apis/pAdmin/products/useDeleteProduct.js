import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useDeleteProduct = productsMutate =>
   useSWRMutation('store/products/get_update_destroy/', (url, data) =>
      axiosInstance
         .delete(url, {
            params: {
               title: data.arg,
            },
         })
         .then(res => {
            productsMutate();
            return res.data;
         })
   );

export default useDeleteProduct;
