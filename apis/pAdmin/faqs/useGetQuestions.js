import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetQuestions = () =>
   useSWR(`accounts/questions/list_create/`, url => axiosInstance(url).then(res => res.data));

export default useGetQuestions;
