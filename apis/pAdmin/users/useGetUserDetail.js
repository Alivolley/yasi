import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetUserDetail = userId =>
   useSWR(userId ? `store/cart/list/?user=${userId}&page_size=10000` : null, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetUserDetail;
