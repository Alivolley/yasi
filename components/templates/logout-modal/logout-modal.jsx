import { useState } from 'react';

// MUI
import { LoadingButton } from '@mui/lab';
import { Button, Dialog } from '@mui/material';

// Utils
import logoutHandler from '@/utils/logoutHandler';

function LogoutModal({ show, onClose }) {
   const [loading, setLoading] = useState(false);

   const logoutFuncHandler = () => {
      setLoading(true);
      logoutHandler();
   };

   return (
      <Dialog open={show} onClose={onClose}>
         <div className="flex flex-col gap-3 bg-white px-10 py-5">
            <p className="text-center text-base font-bold">آیا از خروج از حساب کاربری خود مطمئن هستید ؟</p>

            <div className="mt-5 flex items-center gap-3">
               <Button variant="contained" color="textColor" className="!text-white" fullWidth onClick={onClose}>
                  خیر
               </Button>
               <LoadingButton
                  variant="contained"
                  color="customPink"
                  className={loading ? '' : '!text-white'}
                  fullWidth
                  onClick={logoutFuncHandler}
                  loading={loading}
               >
                  بله
               </LoadingButton>
            </div>
         </div>
      </Dialog>
   );
}

export default LogoutModal;
