import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// MUI
import { Dialog, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Apis
import useAddQuestion from '@/apis/pAdmin/faqs/useAddQuestion';
import useEditQuestion from '@/apis/pAdmin/faqs/useEditQuestion';

function AddEditQuestionModal({ show, onClose, isEdit = false, detail, questionsMutate }) {
   const { trigger: addQuestionTrigger, isMutating: addQuestionIsMutating } = useAddQuestion();
   const { trigger: editQuestionTrigger, isMutating: editQuestionIsMutating } = useEditQuestion(detail?.id);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm({
      defaultValues: {
         questionText: '',
         answerText: '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      reset();
   };

   const formSubmit = data => {
      const newQuestion = {
         question: data?.questionText,
         answer: data?.answerText,
      };

      if (isEdit) {
         editQuestionTrigger(newQuestion, {
            onSuccess: () => {
               questionsMutate();
               closeModalHandler();
            },
         });
      } else {
         addQuestionTrigger(newQuestion, {
            onSuccess: () => {
               questionsMutate();
               closeModalHandler();
            },
         });
      }
   };

   useEffect(() => {
      if (isEdit && detail) {
         setValue('questionText', detail?.question);
         setValue('answerText', detail?.answer);
      }
   }, [detail]);

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth maxWidth="xs">
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">{isEdit ? 'ویرایش سوال' : 'افزودن سوال'}</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>

            <form onSubmit={handleSubmit(formSubmit)} className="mt-10 space-y-6">
               <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                     <p className="text-sm text-customBlue">سوال</p>
                     <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        {...register('questionText', { required: { value: true, message: 'این فیلد اجباری است' } })}
                        error={!!errors?.questionText}
                        helperText={errors?.questionText?.message}
                     />
                  </div>

                  <div className="flex flex-col gap-1">
                     <p className="text-sm text-textColor">پاسخ</p>
                     <TextField
                        fullWidth
                        multiline
                        minRows={5}
                        {...register('answerText', { required: { value: true, message: 'این فیلد اجباری است' } })}
                        error={!!errors?.answerText}
                        helperText={errors?.answerText?.message}
                     />
                  </div>
               </div>

               <div>
                  <LoadingButton
                     variant="contained"
                     type="submit"
                     size="large"
                     color="customPinkHigh"
                     loading={addQuestionIsMutating || editQuestionIsMutating}
                     fullWidth
                     className="!rounded-10 !p-3 !text-white"
                  >
                     {isEdit ? 'ویرایش سوال' : 'افزودن سوال'}
                  </LoadingButton>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default AddEditQuestionModal;
