import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useDeleteComment = () =>
   useSWRMutation('store/comments/delete/', (url, data) =>
      axiosInstance
         .delete(url, {
            params: {
               pk: data.arg,
            },
         })
         .then(res => res.data)
   );

export default useDeleteComment;
