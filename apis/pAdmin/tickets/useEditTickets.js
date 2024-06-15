import useSWRMutation from 'swr/mutation';
import axiosInstance from '@/configs/axiosInstance';

const useEditTickets = ticketId =>
   useSWRMutation(`accounts/contact-us/get_edit/?pk=${ticketId}`, (url, data) =>
      axiosInstance.patch(url, data?.arg).then(res => res.data)
   );

export default useEditTickets;
