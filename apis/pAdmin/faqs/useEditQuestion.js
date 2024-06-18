import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useEditQuestion = questionId =>
   useSWRMutation(`accounts/questions/get_update_delete/?pk=${questionId}`, (url, data) =>
      axiosInstance.patch(url, data.arg).then(res => res.data)
   );

export default useEditQuestion;
