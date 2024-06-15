import useSWRInfinite from 'swr/infinite';
import axiosInstance from '@/configs/axiosInstance';

const getKey = pageIndex => {
   if (pageIndex === 0) {
      return `store/comments/list_create/`;
   }

   return `store/comments/list_create?page=${pageIndex + 1}`;
};

const useGetComments = productId =>
   useSWRInfinite(getKey, url =>
      axiosInstance(url, {
         params: {
            product_id: productId,
         },
      }).then(res => res.data)
   );

export default useGetComments;
