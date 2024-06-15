import useSWR from 'swr';
import axiosInstance from '@/configs/axiosInstance';

const useGetProductDetail = productTitle =>
   useSWR(productTitle ? `store/products/get_update_destroy/?title=${productTitle}&is_admin_panel=True` : null, url =>
      axiosInstance(url).then(res => res.data)
   );

export default useGetProductDetail;
