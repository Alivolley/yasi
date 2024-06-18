import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetSearchCards = (searchValue, page, countValue) =>
   useSWR(
      searchValue
         ? `store/cart/list/?search=${searchValue}&page=${page}&page_size=${countValue}&is_admin_panel=True`
         : null,
      url => axiosInstance(url).then(res => res.data)
   );

export default useGetSearchCards;
