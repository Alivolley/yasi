import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetSearchUsers = (pageStatus, countValue, searchValue) =>
   useSWR(
      searchValue ? `accounts/users/list/?page=${pageStatus}&page_size=${countValue}&search=${searchValue}` : null,
      url => axiosInstance(url).then(res => res.data)
   );

export default useGetSearchUsers;
