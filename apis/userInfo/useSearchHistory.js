import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useSearchHistory = () => useSWR('store/search/', url => axiosInstance(url).then(res => res.data));

export default useSearchHistory;
