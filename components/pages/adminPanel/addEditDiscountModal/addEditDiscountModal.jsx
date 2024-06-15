import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// MUI
import { Dialog, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Apis
import useAddDiscount from '@/apis/pAdmin/discounts/useAddDiscount';
import useEditDiscount from '@/apis/pAdmin/discounts/useEditDiscount';

function AddEditDiscountModal({ show, onClose, isEdit = false, detail, discountsMutate }) {
   const { trigger: addDiscountTrigger, isMutating: addDiscountIsMutating } = useAddDiscount();
   const { trigger: editDiscountTrigger, isMutating: editDiscountIsMutating } = useEditDiscount(detail?.id);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm({
      defaultValues: {
         codeName: '',
         discountPercent: '',
         productCount: '',
         daysLimit: '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      reset();
   };

   const formSubmit = data => {
      const newCode = {
         code: data?.codeName,
         percent: data?.discountPercent,
         count: data?.productCount,
         expiration_days: data?.daysLimit,
      };

      if (isEdit) {
         editDiscountTrigger(newCode, {
            onSuccess: () => {
               discountsMutate();
               closeModalHandler();
            },
         });
      } else {
         addDiscountTrigger(newCode, {
            onSuccess: () => {
               discountsMutate();
               closeModalHandler();
            },
         });
      }
   };

   useEffect(() => {
      if (isEdit && detail) {
         setValue('codeName', detail?.code);
         setValue('discountPercent', detail?.percent);
         setValue('productCount', detail?.count);
         setValue('daysLimit', detail?.expiration_time?.day);
      }
   }, [detail]);

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth>
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">{isEdit ? 'ویرایش کد تخفیف' : 'افزودن کد تخفیف'}</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>

            <form onSubmit={handleSubmit(formSubmit)} className="mt-10 space-y-6">
               <div className="flex flex-col gap-5 customSm:flex-row customSm:items-start">
                  <div className="flex flex-1 flex-col gap-1">
                     <p className="text-sm text-customBlue">نام کد</p>
                     <TextField
                        variant="outlined"
                        fullWidth
                        autoComplete="off"
                        {...register('codeName', { required: { value: true, message: 'این فیلد اجباری است' } })}
                        error={!!errors?.codeName}
                        helperText={errors?.codeName?.message}
                     />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                     <p className="text-sm text-textColor">درصد تخفیف</p>
                     <TextField
                        fullWidth
                        type="number"
                        sx={{
                           input: {
                              MozAppearance: 'textfield',
                              appearance: 'textfield',
                              '&::-webkit-inner-spin-button': {
                                 WebkitAppearance: 'none',
                                 appearance: 'none',
                              },
                           },
                        }}
                        {...register('discountPercent', { required: { value: true, message: 'این فیلد اجباری است' } })}
                        error={!!errors?.discountPercent}
                        helperText={errors?.discountPercent?.message}
                     />
                  </div>
               </div>

               <div className="flex flex-col gap-5 customSm:flex-row customSm:items-start">
                  <div className="flex flex-1 flex-col gap-1">
                     <p className="mb-2 text-sm text-textColor">تعداد برای تخفیف</p>
                     <TextField
                        fullWidth
                        type="number"
                        sx={{
                           input: {
                              MozAppearance: 'textfield',
                              appearance: 'textfield',
                              '&::-webkit-inner-spin-button': {
                                 WebkitAppearance: 'none',
                                 appearance: 'none',
                              },
                           },
                        }}
                        {...register('productCount', { required: { value: true, message: 'این فیلد اجباری است' } })}
                        error={!!errors?.productCount}
                        helperText={errors?.productCount?.message}
                     />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                     <p className="mb-2 text-sm text-textColor">تعداد روزها</p>
                     <TextField
                        fullWidth
                        type="number"
                        sx={{
                           input: {
                              MozAppearance: 'textfield',
                              appearance: 'textfield',
                              '&::-webkit-inner-spin-button': {
                                 WebkitAppearance: 'none',
                                 appearance: 'none',
                              },
                           },
                        }}
                        {...register('daysLimit', { required: { value: true, message: 'این فیلد اجباری است' } })}
                        error={!!errors?.daysLimit}
                        helperText={errors?.daysLimit?.message}
                     />
                  </div>
               </div>

               <div>
                  <LoadingButton
                     variant="contained"
                     type="submit"
                     size="large"
                     color="customPinkHigh"
                     loading={addDiscountIsMutating || editDiscountIsMutating}
                     fullWidth
                     className="!rounded-10 !p-3 !text-white"
                  >
                     {isEdit ? 'ویرایش کد تخفیف' : 'افزودن کد تخفیف'}
                  </LoadingButton>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default AddEditDiscountModal;
