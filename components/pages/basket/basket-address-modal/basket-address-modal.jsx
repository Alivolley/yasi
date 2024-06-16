import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// MUI
import { Button, Dialog, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// Apis
import useAddAddress from '@/apis/profile/useAddAddress';
import useEditAddress from '@/apis/profile/useEditAddress';

function BasketAddressModal({ show, onClose, isEdit = false, detail, usersMutate, userId }) {
   const { trigger: addAddressTrigger, isMutating: addAddressIsMutating } = useAddAddress(userId);
   const { trigger: editAddressTrigger, isMutating: editAddressIsMutating } = useEditAddress();

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm({
      defaultValues: {
         postCode: '',
         fullAddress: '',
         transfereeFullName: '',
         transfereePhoneNumber: '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      if (!isEdit) {
         reset();
      }
   };

   const formSubmit = data => {
      const newAddress = {
         address: data?.fullAddress,
         recipient_name: data?.transfereeFullName,
         phone_number: data?.transfereePhoneNumber,
         postal_code: data?.postCode,
      };

      if (isEdit) {
         editAddressTrigger(
            { newAddress, addressId: detail?.id },
            {
               onSuccess: () => {
                  closeModalHandler();
                  if (usersMutate) {
                     usersMutate();
                  }
               },
            }
         );
      } else {
         addAddressTrigger(newAddress, {
            onSuccess: () => {
               closeModalHandler();
               if (usersMutate) {
                  usersMutate();
               }
            },
         });
      }
   };

   useEffect(() => {
      if (isEdit) {
         setValue('fullAddress', detail?.address);
         setValue('postCode', detail?.postal_code);
         setValue('transfereeFullName', detail?.recipient_name);
         setValue('transfereePhoneNumber', detail?.phone_number);
      }
   }, [detail, detail?.id]);

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth>
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex h-10 w-full items-center bg-white py-7">
               <IconButton onClick={closeModalHandler}>
                  <HighlightOffIcon />
               </IconButton>
               <p className="grow text-center text-lg font-bold">{isEdit ? 'ویرایش آدرس' : 'افزودن آدرس جدید'}</p>
            </div>

            <p className="my-6 rounded-10 bg-[#F5F8FC] p-4 font-bold">اطلاعات آدرس</p>

            <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
               <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm text-[#7E8AAB]">کد پستی</p>
                  <TextField
                     variant="outlined"
                     fullWidth
                     color="customPink"
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
                     {...register('postCode')}
                     disabled={addAddressIsMutating || editAddressIsMutating}
                  />
               </div>

               <div className="flex flex-col gap-1">
                  <p className="text-sm text-[#7E8AAB]">آدرس دقیق شما</p>
                  <TextField
                     variant="outlined"
                     fullWidth
                     multiline
                     rows={5}
                     color="customPink"
                     {...register('fullAddress', {
                        required: {
                           value: true,
                           message: 'این فیلد اجباری است',
                        },
                     })}
                     error={!!errors?.fullAddress}
                     helperText={errors?.fullAddress?.message}
                     disabled={addAddressIsMutating || editAddressIsMutating}
                  />
               </div>

               <p className="my-6 rounded-10 bg-[#F5F8FC] p-4 font-bold">اطلاعات تحویل گیرنده</p>

               <div className="flex flex-col gap-3 customSm:flex-row">
                  <div className="flex flex-1 flex-col gap-1">
                     <p className="text-sm text-[#7E8AAB]">نام کامل تحویل گیرنده</p>
                     <TextField
                        variant="outlined"
                        fullWidth
                        color="customPink"
                        {...register('transfereeFullName', {
                           required: {
                              value: true,
                              message: 'این فیلد اجباری است',
                           },
                        })}
                        error={!!errors?.transfereeFullName}
                        helperText={errors?.transfereeFullName?.message}
                        disabled={addAddressIsMutating || editAddressIsMutating}
                     />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                     <p className="text-sm text-[#7E8AAB]">شماره تلفن تحویل گیرنده</p>

                     <TextField
                        fullWidth
                        type="number"
                        color="customPink"
                        {...register('transfereePhoneNumber', {
                           required: {
                              value: true,
                              message: 'این فیلد اجباری است',
                           },
                           pattern: {
                              value: /^09\d{9}$/g,
                              message: 'لطفا یک شماره تلفن معتبر وارد کنید',
                           },
                        })}
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
                        error={!!errors?.transfereePhoneNumber}
                        helperText={errors?.transfereePhoneNumber?.message}
                        disabled={addAddressIsMutating || editAddressIsMutating}
                     />
                  </div>
               </div>

               <div className="flex flex-col gap-3 customSm:flex-row customSm:items-stretch">
                  <div className="grow-[2]">
                     <LoadingButton
                        variant="contained"
                        type="submit"
                        size="large"
                        color="customPink2"
                        loading={addAddressIsMutating || editAddressIsMutating}
                        fullWidth
                        className="!rounded-10 !p-3"
                     >
                        {isEdit ? 'ویرایش آدرس' : 'افزودن آدرس'}
                     </LoadingButton>
                  </div>

                  <div className="grow">
                     <Button
                        onClick={closeModalHandler}
                        variant="contained"
                        fullWidth
                        className="!h-full !rounded-10 !py-3 !font-bold"
                        color="borderColor"
                        disabled={addAddressIsMutating || editAddressIsMutating}
                     >
                        بازگشت
                     </Button>
                  </div>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default BasketAddressModal;
