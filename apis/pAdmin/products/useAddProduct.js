import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useAddProduct = (pictures, colorsAndCount, setUploadPercent) =>
   useSWRMutation('store/products/list_create/', (url, data) =>
      axiosInstance.post(url, data.arg).then(async res => {
         await axiosInstance.post(`store/product-color/list_create_update/?product_id=${res.data?.id}`, colorsAndCount);

         const newPictures = new FormData();
         await pictures.forEach(item => newPictures.append('images', item));

         await axiosInstance.post(`store/product-image/create_update/?product_id=${res.data?.id}`, newPictures, {
            onUploadProgress: progressEvent => {
               setUploadPercent(Math.floor(progressEvent.progress * 100));
            },
         });
      })
   );

export default useAddProduct;
