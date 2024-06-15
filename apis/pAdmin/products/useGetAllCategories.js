import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetAllCategories = () =>
   useSWR('store/categories/list_create/?is_admin_panel=True', url => axiosInstance(url).then(res => res.data));

export default useGetAllCategories;
