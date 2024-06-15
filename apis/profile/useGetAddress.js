import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetAddress = () => useSWR('accounts/address/list_create/', url => axiosInstance(url).then(res => res.data));

export default useGetAddress;
