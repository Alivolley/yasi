import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetShippingCost = show =>
   useSWR(show ? 'store/shipping-cost/get_update/' : null, url => axiosInstance(url).then(res => res.data));

export default useGetShippingCost;
