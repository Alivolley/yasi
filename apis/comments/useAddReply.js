import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useAddReply = () =>
   useSWRMutation('store/comments/list_create/', (url, data) =>
      axiosInstance
         .post(url, data.arg.newReply, {
            params: {
               comment_id: data.arg.id,
            },
         })
         .then(res => res.data)
   );

export default useAddReply;
