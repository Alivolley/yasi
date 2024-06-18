import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetSearchProducts = (pageStatus, countValue, searchValue) =>
   useSWR(
      searchValue
         ? `store/products/list_create/?page=${pageStatus}&page_size=${countValue}&search=${searchValue}`
         : null,
      url => axiosInstance(url).then(res => res.data)
   );

export default useGetSearchProducts;
