import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetAllCards = (filter, page, countValue) =>
   useSWR(`store/cart/list/?status=${filter}&page=${page}&page_size=${countValue}&is_admin_panel=True`, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetAllCards;
