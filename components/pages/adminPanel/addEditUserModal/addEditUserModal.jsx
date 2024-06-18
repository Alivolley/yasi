import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

// MUI
import { Autocomplete, Checkbox, Dialog, FormControlLabel, FormHelperText, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// Apis
import useAddUser from '@/apis/pAdmin/users/useAddUser';

function AddEditUserModal({ show, onClose, isEdit = false, detail, usersMutate }) {
   const permissionList = [
      { title: 'ویرایش ارتباط با ما', code: 101 },
      { title: 'افزودن دسته بندی', code: 102 },
      { title: 'ویرایش دسته بندی', code: 103 },
      { title: 'حذف دسته بندی', code: 104 },
      { title: 'افزودن محصول', code: 105 },
      { title: 'ویرایش محصول', code: 106 },
      { title: 'حذف محصول', code: 107 },
      { title: 'ویرایش هزینه ارسال', code: 108 },
      { title: 'نمایش کد تخفیف', code: 109 },
      { title: 'افزودن کد تخفیف', code: 110 },
      { title: 'ویرایش کد تخفیف', code: 111 },
      { title: 'حذف کد تخفیف', code: 112 },
      { title: 'تغییر وضعیت سفارش', code: 113 },
      { title: 'پاسخ به کامنت', code: 114 },
      { title: 'حذف کامنت', code: 115 },
      { title: 'نمایش گزارشات', code: 116 },
      { title: 'ویرایش اطلاعات کاربران', code: 117 },
      { title: 'بلاک کردن کاربران', code: 118 },
      // { title: 'افزودن بنر آفرها', code: 119 },
      { title: 'افزودن سوال متداول', code: 120 },
      { title: 'ویرایش سوال متداول', code: 121 },
      { title: 'حذف سوال متداول', code: 122 },
   ];

   const { trigger: addUserTrigger, isMutating: addUserIsMutating } = useAddUser();

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      watch,
      control,
   } = useForm({
      defaultValues: {
         phoneNumber: '',
         isAdmin: false,
         password: '',
         permissions: [],
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      reset();
   };

   useEffect(() => {
      if (isEdit && detail) {
         setValue('phoneNumber', detail?.phone_number);
         if (detail?.role === 'admin') {
            setValue('isAdmin', true);
            const selectedCodesAsNumbers = detail?.permissions?.map(code => parseInt(code, 10));
            const filteredPermissions = permissionList?.filter(item => selectedCodesAsNumbers?.includes(item.code));
            setValue('permissions', filteredPermissions);
         }
      }
   }, [detail]);

   const formSubmit = data => {
      let newUser = null;
      if (data?.isAdmin) {
         const codesArray = data?.permissions?.map(item => item.code);

         newUser = new FormData();
         newUser.append('phone_number', data?.phoneNumber);
         newUser.append('is_admin', data?.isAdmin);
         if (data?.password) {
            newUser.append('password', data?.password);
         }
         codesArray?.map(item => newUser.append('codes', item));

         addUserTrigger(newUser, {
            onSuccess: () => {
               usersMutate();
               closeModalHandler();
            },
         });
      } else {
         newUser = {
            phone_number: data?.phoneNumber,
            is_admin: data?.isAdmin,
            password: null,
         };

         addUserTrigger(newUser, {
            onSuccess: () => {
               usersMutate();
               closeModalHandler();
            },
         });
      }
   };

   const isAdminCheckbox = watch('isAdmin');

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth maxWidth="xs">
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">{isEdit ? 'ویرایش شخص' : 'افزودن شخص'}</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>
            <form onSubmit={handleSubmit(formSubmit)} className="mt-10 space-y-4">
               <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm text-customBlue">شماره تماس</p>

                  <TextField
                     fullWidth
                     type="number"
                     placeholder="شماره تماس خود را وارد کنید"
                     {...register('phoneNumber', {
                        required: { value: true, message: 'این فیلد اجباری است' },
                        pattern: { value: /^09\d{9}$/g, message: 'لطفا یک شماره تلفن معتبر وارد کنید' },
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
                     error={!!errors?.phoneNumber}
                     helperText={errors?.phoneNumber?.message}
                     disabled={isEdit}
                  />
               </div>

               <div className="flex h-full items-end">
                  <Controller
                     control={control}
                     name="isAdmin"
                     render={({ field: { onChange, value } }) => (
                        <FormControlLabel
                           control={<Checkbox checked={value} />}
                           label="ادمین است"
                           value={value}
                           onChange={onChange}
                        />
                     )}
                  />
               </div>

               {isAdminCheckbox && (
                  <>
                     <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm text-[#7E8AAB]">دسترسی ها</p>
                        <Controller
                           control={control}
                           name="permissions"
                           rules={{ required: 'این فیلد اجباری است' }}
                           render={({ field: { onChange, value }, fieldState }) => (
                              <>
                                 <Autocomplete
                                    multiple
                                    options={permissionList}
                                    disableCloseOnSelect
                                    value={value}
                                    isOptionEqualToValue={(option, optValue) => option.title === optValue.title}
                                    onChange={(e, newValue) => onChange(newValue)}
                                    getOptionLabel={option => option.title}
                                    renderOption={(props, option, { selected }) => (
                                       <li {...props}>
                                          <Checkbox
                                             icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                             checkedIcon={<CheckBoxIcon fontSize="small" />}
                                             style={{ marginRight: 8 }}
                                             checked={selected}
                                          />
                                          {option.title}
                                       </li>
                                    )}
                                    renderInput={params => (
                                       <TextField {...params} error={!!errors?.permissions?.message} />
                                    )}
                                 />

                                 {fieldState.invalid
                                    ? errors?.permissions?.message && (
                                         <FormHelperText error>{errors?.permissions?.message}</FormHelperText>
                                      )
                                    : null}
                              </>
                           )}
                        />
                     </div>

                     <div className="flex flex-1 flex-col gap-1">
                        <p className="text-sm text-customBlue">رمز عبور</p>
                        <TextField
                           variant="outlined"
                           fullWidth
                           autoComplete="off"
                           {...register('password', {
                              required: {
                                 value: !isEdit,
                                 message: 'این فیلد اجباری است',
                              },
                              minLength: {
                                 value: 8,
                                 message: 'رمز عبور باید بیش از ۸ کلمه باشد',
                              },
                           })}
                           error={!!errors?.password}
                           helperText={errors?.password?.message}
                        />
                     </div>
                  </>
               )}

               <div>
                  <LoadingButton
                     variant="contained"
                     type="submit"
                     size="large"
                     color="customPinkHigh"
                     loading={addUserIsMutating}
                     fullWidth
                     className="!rounded-10 !p-3 !text-white"
                  >
                     {isEdit ? 'ویرایش شخص' : 'افزودن شخص'}
                  </LoadingButton>
               </div>
            </form>
         </div>
      </Dialog>
   );
}

export default AddEditUserModal;
