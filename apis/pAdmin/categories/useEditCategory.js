import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useEditCategory = categoryId => {
   const { mutate } = useSWRConfig();
   return useSWRMutation(`store/categories/get_update_delete/?pk=${categoryId}`, (url, data) =>
      axiosInstance.patch(url, data.arg).then(res => {
         mutate('store/categories/list_create/');
         return res.data;
      })
   );
};

export default useEditCategory;
