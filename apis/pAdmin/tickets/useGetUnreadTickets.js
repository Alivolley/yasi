import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetUnreadTickets = () =>
   useSWR(`accounts/contact-us/list_create/?has_seen=false`, url => axiosInstance(url).then(res => res.data));

export default useGetUnreadTickets;
