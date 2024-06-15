import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useContactUs = () =>
   useSWRMutation('accounts/contact-us/list_create/', (url, data) =>
      axiosInstance.post(url, data.arg).then(res => res.data)
   );

export default useContactUs;
