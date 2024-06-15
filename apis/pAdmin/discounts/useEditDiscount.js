import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useEditDiscount = codeId =>
   useSWRMutation(`store/discount-code/get_update_delete/?pk=${codeId}`, (url, data) =>
      axiosInstance.patch(url, data.arg).then(res => res.data)
   );

export default useEditDiscount;
