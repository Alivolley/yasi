import { useSWRConfig } from 'swr';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button, Dialog, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

// Apis
import useEditTickets from '@/apis/pAdmin/tickets/useEditTickets';

// Utils
import permissions from '@/utils/permission';

function EditTicketModal({ show, onClose, detail, ticketsMutate }) {
   const { mutate } = useSWRConfig();

   const userInfo = useSelector(state => state?.userInfoReducer);

   const { trigger: editTicketTrigger, isMutating: editTicketIsMutating } = useEditTickets(detail?.id);

   const closeModalHandler = () => {
      onClose();
   };

   const editTicketHandler = () => {
      editTicketTrigger(
         { has_seen: true },
         {
            onSuccess: () => {
               closeModalHandler();
               ticketsMutate();
               mutate('accounts/contact-us/list_create/?has_seen=false');
            },
         }
      );
   };
   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth maxWidth="xs">
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">جزییات تیکت</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>

            <div className="mt-8 space-y-7 text-sm">
               <div className="flex items-center gap-2">
                  <p className="text-textColor">نام : </p>
                  <p>{detail?.first_name}</p>
               </div>
               <div className="flex items-center gap-2">
                  <p className="text-textColor">نام خانوادگی : </p>
                  <p>{detail?.last_name}</p>
               </div>
               <div className="flex items-center gap-2">
                  <p className="text-textColor">شماره تماس : </p>
                  <p>{detail?.phone_number}</p>
               </div>
               <div className="flex items-center gap-2">
                  <p className="text-textColor">ایمیل : </p>
                  <p>{detail?.email}</p>
               </div>
               <div className="space-y-2">
                  <p className="text-textColor">متن پیام : </p>
                  <p>{detail?.text}</p>
               </div>
            </div>

            <div className="mt-8">
               {detail?.has_seen ? (
                  <Button
                     variant="contained"
                     fullWidth
                     className="!rounded-10 !py-2 !text-green-500"
                     size="large"
                     disabled
                     startIcon={<CheckCircleOutlineOutlinedIcon />}
                  >
                     خوانده شده
                  </Button>
               ) : (
                  <LoadingButton
                     variant="contained"
                     color="customPinkHigh"
                     fullWidth
                     className="!rounded-10 !py-2 !text-white"
                     size="large"
                     onClick={editTicketHandler}
                     loading={editTicketIsMutating}
                     disabled={
                        !userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.CONTACT_US?.PATCH)
                     }
                  >
                     تغییر به خوانده شد
                  </LoadingButton>
               )}
            </div>
         </div>
      </Dialog>
   );
}

export default EditTicketModal;
