// MUI
import { LoadingButton } from '@mui/lab';
import { Button, Dialog } from '@mui/material';

function ConfirmModal({ closeModal, title, confirmHandler, open, confirmLoading = false }) {
   return (
      <Dialog open={open} onClose={closeModal}>
         <div className="flex flex-col gap-3 bg-white px-10 py-5">
            <p className="text-center text-base font-bold">{title}</p>

            <div className="mt-5 flex items-center gap-3">
               <Button variant="contained" color="textColor" className="!text-white" fullWidth onClick={closeModal}>
                  خیر
               </Button>
               <LoadingButton
                  variant="contained"
                  color="customPink"
                  fullWidth
                  className={confirmLoading ? '' : '!text-white'}
                  onClick={confirmHandler}
                  loading={confirmLoading}
               >
                  بله
               </LoadingButton>
            </div>
         </div>
      </Dialog>
   );
}

export default ConfirmModal;
