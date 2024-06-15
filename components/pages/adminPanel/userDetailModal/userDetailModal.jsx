import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

// MUI
import { Backdrop, Button, CircularProgress, Dialog, Grid, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import PublishIcon from '@mui/icons-material/Publish';
import PhotoCameraBackOutlinedIcon from '@mui/icons-material/PhotoCameraBackOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

// Assets
import userProfilePic from '@/assets/images/userProfile.png';

// Components
import BasketAddressCard from '../../basket/basket-address-card/basket-address-card';
import BasketAddressModal from '../../basket/basket-address-modal/basket-address-modal';
import OrderCard from '@/components/templates/order-card/order-card';

// Apis
import useChangeProfileImage from '@/apis/profile/useChangeProfileImage';
import useChangeProfileInfo from '@/apis/profile/useChangeProfileInfo';
import useGetUserDetail from '@/apis/pAdmin/users/useGetUserDetail';

function UserDetailModal({ show, onClose, detail, usersMutate }) {
   const [showBasketAddressModal, setShowBasketAddressModal] = useState(false);

   const { data: userData, isLoading: userIsLoading } = useGetUserDetail(detail?.id);

   const { trigger: changeProfileTrigger, isMutating: changeProfileIsMutating } = useChangeProfileImage(
      detail?.phone_number
   );
   const { trigger: changeProfileInfoTrigger, isMutating: changeProfileInfoIsMutating } = useChangeProfileInfo(
      detail?.phone_number
   );

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
   } = useForm({
      defaultValues: {
         fullName: '',
      },
      mode: 'onSubmit',
   });

   const closeModalHandler = () => {
      onClose();
      reset();
   };

   const formSubmit = data => {
      const newDetail = {
         name: data?.fullName,
      };

      changeProfileInfoTrigger(newDetail, {
         onSuccess: () => {
            usersMutate();
         },
      });
   };

   const changeProfileImageHandler = e => {
      const file = e?.target?.files[0];
      const formData = new FormData();
      formData.append('image', file);
      changeProfileTrigger(formData, {
         onSuccess: () => {
            usersMutate();
         },
      });
   };

   useEffect(() => {
      if (detail) {
         setValue('fullName', detail?.name);
      }
   }, [detail]);

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth maxWidth="xl">
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">جزییات</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>
            <div className="mt-5 border-b border-solid border-[#E4EAF0] pb-6">
               <p className="font-bold">اطلاعات شخصی</p>

               <form
                  onSubmit={handleSubmit(formSubmit)}
                  className="mb-6 mt-12 flex flex-col items-center gap-12 customMd:flex-row customMd:items-end customMd:gap-5"
               >
                  <div className="relative mx-auto w-fit cursor-pointer customMd:mx-0">
                     <div className="size-28 cursor-pointer">
                        <Image
                           src={detail?.image || userProfilePic}
                           alt="user profile"
                           className="cursor-pointer rounded-full object-cover"
                           fill
                        />
                     </div>
                     <IconButton
                        className="!absolute !bottom-[-15px] !start-1 !cursor-pointer !bg-customPink2"
                        sx={{ width: '33px', height: '33px' }}
                     >
                        <PhotoCameraBackOutlinedIcon fontSize="small" />
                     </IconButton>

                     <input
                        type="file"
                        className="absolute inset-0 cursor-pointer opacity-0"
                        onChange={changeProfileImageHandler}
                        accept="image/*"
                     />
                  </div>

                  <div className="flex flex-col gap-5 customMd:flex-row customMd:items-stretch">
                     <div>
                        <TextField
                           label="نام و نام خانوادگی"
                           {...register('fullName', { required: { value: true, message: 'این فیلد اجباری است' } })}
                           error={!!errors?.fullName}
                           helperText={errors?.fullName?.message}
                           disabled={changeProfileInfoIsMutating}
                           fullWidth
                        />
                     </div>
                     <div>
                        <LoadingButton
                           variant="contained"
                           type="submit"
                           size="large"
                           color="customPink2"
                           loading={changeProfileInfoIsMutating}
                           className="!h-full !rounded-10 !text-[#B1302E]"
                           fullWidth
                           startIcon={<PublishIcon className="rotate-180" />}
                        >
                           ویرایش
                        </LoadingButton>
                     </div>
                  </div>
               </form>
            </div>

            <div className="rounded-md border-b border-solid border-[#E4EAF0] bg-[#f5f8fc] px-5 py-8">
               <div className="flex flex-wrap items-center justify-between gap-5">
                  <p className="text-base font-bold">آدرس های ثبت شده</p>
                  <Button
                     variant="contained"
                     type="submit"
                     size="large"
                     color="customPink2"
                     className="!rounded-10 !text-[#B1302E]"
                     onClick={() => setShowBasketAddressModal(true)}
                     startIcon={<AddLocationAltOutlinedIcon />}
                  >
                     افزودن آدرس
                  </Button>
               </div>

               <div className="mt-6">
                  {detail?.addresses?.length ? (
                     <div>
                        <Grid container spacing={2}>
                           {detail?.addresses?.map(item => (
                              <Grid key={item?.id} item xs={12} md={6}>
                                 <BasketAddressCard detail={item} usersMutate={usersMutate} />
                              </Grid>
                           ))}
                        </Grid>
                     </div>
                  ) : (
                     <p className="text-center text-base font-bold">آدرسی ثبت نشده است</p>
                  )}
               </div>
            </div>

            <div className="rounded-md px-5 py-8">
               <p className="font-bold">لیست سفارش ها</p>

               {userIsLoading ? (
                  <div className="my-16 flex w-full items-center justify-center">
                     <CircularProgress color="customPink" />
                  </div>
               ) : (
                  <div>
                     {userData?.result?.length ? (
                        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-5">
                           <Grid container spacing={2}>
                              {userData?.result?.map(item => (
                                 <Grid key={item?.order_code} item xs={12}>
                                    <OrderCard detail={item} />
                                 </Grid>
                              ))}
                           </Grid>
                        </div>
                     ) : (
                        <div className="mx-auto my-14 flex max-w-[370px] flex-col gap-4 text-center">
                           <p className="text-xl font-bold">سفارشی ثبت نشده است</p>
                        </div>
                     )}
                  </div>
               )}
            </div>
            <Backdrop sx={{ zIndex: 2 }} open={changeProfileIsMutating}>
               <CircularProgress color="customPink" />
            </Backdrop>

            <BasketAddressModal
               show={showBasketAddressModal}
               onClose={() => setShowBasketAddressModal(false)}
               userId={detail?.id}
               usersMutate={usersMutate}
            />
         </div>
      </Dialog>
   );
}

export default UserDetailModal;
