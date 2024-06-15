import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetProducts = (pageStatus, countValue, categoryTitle) =>
   useSWR(`store/products/list_create/?page=${pageStatus}&page_size=${countValue}&category=${categoryTitle}`, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetProducts;
