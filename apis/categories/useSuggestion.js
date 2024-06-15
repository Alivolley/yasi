import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useSuggestion = () =>
   useSWR('store/products/list_create/', url =>
      axiosInstance(url, {
         params: {
            suggest: true,
         },
      }).then(res => res.data)
   );

export default useSuggestion;
