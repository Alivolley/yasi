import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetCards = (filter, page) =>
   useSWR(`store/cart/list/?status=${filter}&page=${page}`, url => axiosInstance(url).then(res => res.data));

export default useGetCards;
