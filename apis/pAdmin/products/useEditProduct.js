import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useEditProduct = (EditPictures, deletedIds, colorsAndCount, setUploadPercent, title, productId) =>
   useSWRMutation(`store/products/get_update_destroy/?title=${title}`, (url, data) =>
      axiosInstance.patch(url, data.arg).then(async () => {
         await axiosInstance.post(`store/product-color/list_create_update/?product_id=${productId}`, colorsAndCount);
         const newPictures = new FormData();
         await deletedIds.forEach(item => newPictures.append('deleted_ids', item));
         await EditPictures.forEach(item => newPictures.append('images', item));
         await axiosInstance.post(`store/product-image/create_update/?product_id=${productId}`, newPictures, {
            onUploadProgress: progressEvent => setUploadPercent(Math.floor(progressEvent.progress * 100)),
         });
      })
   );

export default useEditProduct;
