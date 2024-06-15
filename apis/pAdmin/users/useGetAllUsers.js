import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetAllUsers = (pageStatus, countValue, role) =>
   useSWR(`accounts/users/list/?page=${pageStatus}&page_size=${countValue}&role=${role}`, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetAllUsers;
