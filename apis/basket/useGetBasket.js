import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetBasket = isLogin =>
   useSWR(isLogin ? 'store/cart/get_update/' : null, url => axiosInstance(url).then(res => res.data));

export default useGetBasket;
