import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useChangeShippingCost = () =>
   useSWRMutation('store/shipping-cost/get_update/', (url, data) =>
      axiosInstance.patch(url, data.arg).then(res => res.data)
   );

export default useChangeShippingCost;
