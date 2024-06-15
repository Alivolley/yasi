import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetTickets = (pageStatus, countValue) =>
   useSWR(`accounts/contact-us/list_create/?page=${pageStatus}&page_size=${countValue}`, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetTickets;
