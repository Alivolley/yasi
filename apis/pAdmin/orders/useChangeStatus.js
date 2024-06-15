import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useChangeStatus = orderCode =>
   useSWRMutation(`store/cart/get_update/?order_code=${orderCode}`, (url, data) =>
      axiosInstance.patch(url, data.arg).then(res => res.data)
   );

export default useChangeStatus;
