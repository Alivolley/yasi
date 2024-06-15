import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useDeleteCategory = () => {
   const { mutate } = useSWRConfig();

   return useSWRMutation('store/categories/get_update_delete/?confirmation=True', (url, data) =>
      axiosInstance
         .delete(url, {
            params: {
               pk: data.arg,
            },
         })
         .then(res => {
            mutate(`store/categories/list_create/`);
            return res.data;
         })
   );
};

export default useDeleteCategory;
