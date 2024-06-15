import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetReports = (months, date) =>
   useSWR(`accounts/report/?months=${months}&date=${date}`, url => axiosInstance(url).then(res => res.data));

export default useGetReports;
