import Head from 'next/head';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Backdrop, CircularProgress, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import PublishIcon from '@mui/icons-material/Publish';
import PhotoCameraBackOutlinedIcon from '@mui/icons-material/PhotoCameraBackOutlined';

// Assets
import userProfilePic from '@/assets/images/userProfile.png';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';

// Apis
import useChangeProfileImage from '@/apis/profile/useChangeProfileImage';
import useChangeProfileInfo from '@/apis/profile/useChangeProfileInfo';

function Information() {
   const userInfo = useSelector(state => state?.userInfoReducer);

   const { trigger: changeProfileTrigger, isMutating: changeProfileIsMutating } = useChangeProfileImage();
   const { trigger: changeProfileInfoTrigger, isMutating: changeProfileInfoIsMutating } = useChangeProfileInfo();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm({
      defaultValues: {
         fullName: '',
         phoneNumber: '',
      },
      mode: 'onSubmit',
   });

   useEffect(() => {
      if (userInfo) {
         setValue('fullName', userInfo?.name);
         setValue('phoneNumber', userInfo?.phone_number);
      }
   }, [userInfo]);

   const formSubmit = data => {
      const newDetail = {
         name: data?.fullName,
      };

      changeProfileInfoTrigger(newDetail);
   };

   const changeProfileImageHandler = e => {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      changeProfileTrigger(formData);
   };

   return (
      <ProfileLayout>
         <Head>
            <title>یاسی - اطلاعات حساب</title>
         </Head>
         <div>
            <p className="rounded-2xl bg-white p-7 text-lg font-bold text-[#050F2C]">اطلاعات حساب کاربری</p>

            {Object.keys(userInfo).length > 0 ? (
               <div className="mt-6 rounded-2xl bg-white p-7">
                  <div className="relative mx-auto w-fit cursor-pointer customMd:mx-0">
                     <div className="relative size-28 cursor-pointer">
                        <Image
                           src={userInfo?.image || userProfilePic}
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

                  <form onSubmit={handleSubmit(formSubmit)} className="mt-12">
                     <div className="mb-12 flex flex-col gap-6 customLg:flex-row">
                        <div className="flex flex-1 flex-col gap-2">
                           <p className="text-sm text-[#713802]">نام کامل</p>

                           <TextField
                              variant="outlined"
                              fullWidth
                              color="customPink"
                              placeholder="نام خود را وارد کنید"
                              {...register('fullName', {
                                 required: {
                                    value: true,
                                    message: 'این فیلد اجباری است',
                                 },
                              })}
                              error={!!errors?.fullName}
                              helperText={errors?.fullName?.message}
                              disabled={changeProfileInfoIsMutating}
                           />
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                           <p className="text-sm text-[#713802]">شماره تماس</p>
                           <TextField
                              variant="outlined"
                              fullWidth
                              {...register('phoneNumber')}
                              error={!!errors?.phoneNumber}
                              helperText={errors?.phoneNumber?.message}
                              disabled
                           />
                        </div>
                     </div>

                     <LoadingButton
                        variant="contained"
                        type="submit"
                        size="large"
                        color="customPink2"
                        loading={changeProfileInfoIsMutating}
                        className="!rounded-10 !py-3 !text-[#B1302E]"
                        fullWidth
                        startIcon={<PublishIcon className="rotate-180" />}
                     >
                        ویرایش اطلاعات کاربری
                     </LoadingButton>
                  </form>
               </div>
            ) : (
               <div className="mt-10 flex items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            )}
         </div>
         <Backdrop sx={{ zIndex: 2 }} open={changeProfileIsMutating}>
            <CircularProgress color="customPink" />
         </Backdrop>
      </ProfileLayout>
   );
}

export default Information;
