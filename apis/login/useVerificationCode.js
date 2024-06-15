import useSWRMutation from 'swr/mutation';

import axiosInstance from '@/configs/axiosInstance';

const useVerificationCode = () =>
   useSWRMutation('accounts/send-verification-code/', (url, data) =>
      axiosInstance.post(url, data.arg).then(res => res.data)
   );

export default useVerificationCode;
