import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useEditCost = costId =>
   useSWRMutation(`store/shipping-cost/get_update_delete/?pk=${costId}`, (url, data) =>
      axiosInstance.patch(url, data.arg).then(res => res.data)
   );

export default useEditCost;
