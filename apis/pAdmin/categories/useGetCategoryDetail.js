import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetCategoryDetail = CategoryId =>
   useSWR(CategoryId ? `store/categories/get_update_delete/?pk=${CategoryId}&is_admin_panel=True` : null, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetCategoryDetail;
