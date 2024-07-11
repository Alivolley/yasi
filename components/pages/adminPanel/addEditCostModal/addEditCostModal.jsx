import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// MUI
import { Dialog, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Apis
import useAddCost from '@/apis/pAdmin/shipping-cost/useAddCost';
import useEditCost from '@/apis/pAdmin/shipping-cost/useEditCost';

const numberTypeSx = {
   input: {
      MozAppearance: 'textfield',
      appearance: 'textfield',
      '&::-webkit-inner-spin-button': {
         WebkitAppearance: 'none',
         appearance: 'none',
      },
   },
};

function AddEditCostModal({ show, onClose, isEdit = false, detail, costsMutate }) {
   const { trigger: addCostTrigger, isMutating: addCostIsMutating } = useAddCost();
   const { trigger: editCostTrigger, isMutating: editCostIsMutating } = useEditCost(detail?.id);

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
   } = useForm({
      defaultValues: {
         length: '',
         width: '',
         height: '',
         cartoonPrice: '',
         postPrice: '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      reset();
   };

   const formSubmit = data => {
      const newCode = {
         length: data?.length,
         width: data?.width,
         height: data?.height,
         carton_cost: data?.cartoonPrice,
         postage_fee: data?.postPrice,
      };
      if (isEdit) {
         editCostTrigger(newCode, {
            onSuccess: () => {
               costsMutate();
               closeModalHandler();
            },
         });
      } else {
         addCostTrigger(newCode, {
            onSuccess: () => {
               costsMutate();
               closeModalHandler();
            },
         });
      }
   };

   useEffect(() => {
      if (isEdit && detail) {
         setValue('length', detail?.length);
         setValue('width', detail?.width);
         setValue('height', detail?.height);
         setValue('cartoonPrice', detail?.carton_cost);
         setValue('postPrice', detail?.postage_fee);
      }
   }, [detail]);

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth>
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">{isEdit ? 'ویرایش هزینه' : 'افزودن هزینه'}</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>

            <form onSubmit={handleSubmit(formSubmit)} className="mt-10 space-y-6">
               <div className="flex flex-col gap-1">
                  <p className="mb-2 text-sm text-textColor">ابعاد (cm)</p>
                  <div className="flex items-start justify-between gap-2 customMd:gap-5">
                     <TextField
                        label="طول"
                        fullWidth
                        {...register('length', { required: { value: true, message: 'اجباری' } })}
                        error={!!errors?.length}
                        helperText={errors?.length?.message}
                        type="number"
                        sx={numberTypeSx}
                     />

                     <TextField
                        label="عرض"
                        fullWidth
                        {...register('width', { required: { value: true, message: 'اجباری' } })}
                        error={!!errors?.width}
                        helperText={errors?.width?.message}
                        type="number"
                        sx={numberTypeSx}
                     />

                     <TextField
                        label="ارتفاع"
                        fullWidth
                        {...register('height', { required: { value: true, message: 'اجباری' } })}
                        error={!!errors?.height}
                        helperText={errors?.height?.message}
                        type="number"
                        sx={numberTypeSx}
                     />
                  </div>
               </div>

               <div className="flex flex-col gap-5 customSm:flex-row customSm:items-start">
                  <div className="flex flex-1 flex-col gap-1">
                     <p className="mb-2 text-sm text-textColor">هزینه کارتون (تومان)</p>
                     <TextField
                        fullWidth
                        type="number"
                        sx={numberTypeSx}
                        {...register('cartoonPrice', { required: { value: true, message: 'این فیلد اجباری است' } })}
                        error={!!errors?.cartoonPrice}
                        helperText={errors?.cartoonPrice?.message}
                     />
                  </div>

                  <div className="flex flex-1 flex-col gap-1">
                     <p className="mb-2 text-sm text-textColor">هزینه پست (تومان)</p>
                     <TextField
                        fullWidth
                        type="number"
                        sx={numberTypeSx}
                        {...register('postPrice', { required: { value: true, message: 'این فیلد اجباری است' } })}
                        error={!!errors?.postPrice}
                        helperText={errors?.postPrice?.message}
                     />
                  </div>
               </div>

               <div>
                  <LoadingButton
                     variant="contained"
                     type="submit"
                     size="large"
                     color="customPinkHigh"
                     loading={addCostIsMutating || editCostIsMutating}
                     fullWidth
                     className="!rounded-10 !p-3 !text-white"
                  >
                     {isEdit ? 'ویرایش هزینه' : 'افزودن هزینه'}
                  </LoadingButton>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default AddEditCostModal;
