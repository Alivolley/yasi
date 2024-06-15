import useSWRMutation from 'swr/mutation';
import { useSWRConfig } from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useAddCategory = () => {
   const { mutate } = useSWRConfig();

   return useSWRMutation('store/categories/list_create/', (url, data) =>
      axiosInstance.post(url, data.arg).then(res => {
         mutate('store/categories/list_create/');
         return res.data;
      })
   );
};

export default useAddCategory;
