import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

// MUI
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, TextField } from '@mui/material';

// Apis
import useAddReply from '@/apis/comments/useAddReply';

function ReplyModal({ closeModal, open, detail, commentsMutate }) {
   const { trigger: addReplyTrigger, isMutating: addReplyIsMutating } = useAddReply();

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      defaultValues: {
         replyMessage: detail?.reply_message || '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      closeModal();
      reset();
   };

   const formSubmit = data => {
      const newReply = {
         reply_message: data?.replyMessage,
      };

      addReplyTrigger(
         { newReply, id: detail?.id },
         {
            onSuccess: () => {
               closeModalHandler();
               commentsMutate();

               toast.success('پاسخ شما با موفقیت ثبت شد');
            },
         }
      );
   };

   return (
      <Dialog open={open} onClose={closeModalHandler} fullWidth>
         <div className="bg-white px-10 py-5">
            <p className="mb-12 mt-2 font-bold text-[#66839A]">پاسخ شما به {detail?.user}</p>
            <form className="flex flex-col items-center" onSubmit={handleSubmit(formSubmit)}>
               <TextField
                  label="پاسخ خود را اینجا بنویسید"
                  multiline
                  rows={4}
                  color="customPink"
                  fullWidth
                  {...register('replyMessage', { required: { value: true } })}
                  error={!!errors?.replyMessage}
                  helperText="مثال : ممنون از نظر شما و..."
               />

               <div className="mt-8 flex items-stretch gap-2">
                  <LoadingButton
                     variant="contained"
                     size="large"
                     color="customPink"
                     loading={addReplyIsMutating}
                     className={`!rounded-10 !p-2 customXs:!min-w-[120px] customSm:!min-w-[220px] ${
                        addReplyIsMutating ? '' : '!text-white'
                     }`}
                     type="submit"
                  >
                     <p>ثبت</p>
                  </LoadingButton>
                  <Button
                     onClick={closeModalHandler}
                     color="textColor"
                     variant="contained"
                     className="!rounded-10 !text-white"
                  >
                     بازگشت
                  </Button>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default ReplyModal;
