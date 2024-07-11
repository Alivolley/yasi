import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetCosts = (pageStatus, countValue) =>
   useSWR(`store/shipping-cost/list_create/?page=${pageStatus}&page_size=${countValue}`, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetCosts;
