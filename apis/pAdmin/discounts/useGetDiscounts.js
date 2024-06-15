import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetDiscounts = (pageStatus, countValue) =>
   useSWR(`store/discount-code/list_create/?page=${pageStatus}&page_size=${countValue}`, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetDiscounts;
