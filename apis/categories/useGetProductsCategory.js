import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetProductsCategory = category =>
   useSWR(category ? `store/products/list_create/?category=${category}` : null, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetProductsCategory;
