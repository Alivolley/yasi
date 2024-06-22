/* eslint-disable jsx-a11y/control-has-associated-label */
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import Image from 'next/image';

// MUI
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import SettingsCellOutlinedIcon from '@mui/icons-material/SettingsCellOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

// Assets
import contactUsPic from '@/assets/images/contactUs-vector.png';

// Apis
import useContactUs from '@/apis/useContactUs';

function ContactUs() {
   const { trigger: contactUsTrigger, isMutating: contactUsIsMutating } = useContactUs();

   const {
      register,
      handleSubmit,

      formState: { errors },
      reset,
   } = useForm({
      defaultValues: {
         firstName: '',
         familyName: '',
         phoneNumber: '',
         email: '',
         message: '',
      },
      mode: 'onSubmit',
   });

   const formSubmit = data => {
      const newMessage = {
         first_name: data?.firstName,
         last_name: data?.familyName,
         phone_number: data?.phoneNumber,
         email: data?.email,
         text: data?.message,
      };

      contactUsTrigger(newMessage, {
         onSuccess: () => {
            reset();
         },
      });
   };

   return (
      <div className="bg-[#f6f3f9] px-8 py-[60px] customMd:px-16">
         <Head>
            <title>یاسی هوم - تماس با ما</title>
         </Head>
         <Grid container columnSpacing={4}>
            <Grid item xs={12} md={5} lg={3.5}>
               <div className="rounded-2xl bg-white p-5">
                  <div className="w-full rounded-2xl bg-[#f6f3f9] px-2 pb-2 pt-12">
                     <Image src={contactUsPic} alt="contact us" className="size-full" />
                  </div>
                  <p className="mt-14 text-base font-bold customMd:text-xl">منتظر صدای گرمتان هستیم</p>
                  <p className="mt-2 text-xs text-textColor customMd:text-sm">
                     از طریق راه های زیر میتوانید با ما در ارتباط باشید
                  </p>

                  <div className="mt-10 space-y-5">
                     <a href="tel:02152687469" className="flex items-center gap-4">
                        <p>
                           <PhoneOutlinedIcon color="customPinkHigh" fontSize="small" />
                        </p>
                        <div className="space-y-2">
                           <p>شماره تماس</p>
                           <p className="text-sm text-textColor">09907801869</p>
                        </div>
                     </a>
                     <div className="flex items-center gap-4">
                        <p>
                           <FmdGoodOutlinedIcon color="customPinkHigh" fontSize="small" />
                        </p>
                        <div className="space-y-2">
                           <p>آدرس</p>
                           <address className="text-sm text-textColor">مشهد خیابان رضا کوچه عقاقیا</address>
                        </div>
                     </div>

                     <div className="flex items-center gap-4">
                        <p>
                           <SettingsCellOutlinedIcon color="customPinkHigh" fontSize="small" />
                        </p>
                        <div className="space-y-2">
                           <p>شبکه های اجتماعی</p>
                           <div className="flex items-center gap-5 text-textColor">
                              <a href="https://T.me/yasii_home" target="_blank" rel="noreferrer">
                                 <TelegramIcon fontSize="small" />
                              </a>

                              <a href="https://Www.instagram.com//yasii_home" target="_blank" rel="noreferrer">
                                 <InstagramIcon fontSize="small" />
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Grid>
            <Grid item xs={12} md={7} lg={8.5}>
               <div className="mt-10 rounded-2xl bg-white px-5 py-10 customMd:mt-0 customMd:px-10">
                  <p className="flex items-center gap-2 text-sm font-bold customMd:text-lg">
                     <MailOutlineIcon color="customPinkHigh" /> ارسال پیغام به تیم یاسی هوم
                  </p>
                  <p className="mt-4 text-xs text-textColor customMd:text-sm">
                     متن پیام و اطلاعات خود را برای ما ارسال کنید تا در کوتاه ترین زمان پاسخگو باشیم
                  </p>
                  <form className="mt-10 space-y-6" onSubmit={handleSubmit(formSubmit)}>
                     <div className="flex flex-col justify-between gap-8 customMd:flex-row customMd:items-start">
                        <div className="flex-1 space-y-3">
                           <p className="text-sm font-bold text-[#713802]">نام</p>
                           <TextField
                              color="customPink"
                              placeholder="نام خود را وارد کنید"
                              fullWidth
                              {...register('firstName', { required: { value: true, message: 'این فیلد اجباری است' } })}
                              error={!!errors?.firstName}
                              helperText={errors?.firstName?.message}
                           />
                        </div>
                        <div className="flex-1 space-y-3">
                           <p className="text-sm font-bold text-[#713802]">نام خانوادگی</p>
                           <TextField
                              color="customPink"
                              placeholder="نام خانوادگی خود را وارد کنید"
                              fullWidth
                              {...register('familyName', { required: { value: true, message: 'این فیلد اجباری است' } })}
                              error={!!errors?.familyName}
                              helperText={errors?.familyName?.message}
                           />
                        </div>
                     </div>
                     <div className="flex flex-col justify-between gap-8 customMd:flex-row customMd:items-start">
                        <div className="flex-1 space-y-3">
                           <p className="text-sm font-bold text-[#713802]">شماره تماس</p>

                           <div className="mt-14">
                              <TextField
                                 color="customPink"
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
                              />
                           </div>
                        </div>
                        <div className="flex-1 space-y-3">
                           <p className="text-sm font-bold text-[#713802]">ایمیل</p>
                           <TextField
                              color="customPink"
                              placeholder="ایمیل خود را وارد کنید"
                              fullWidth
                              {...register('email', {
                                 pattern: {
                                    value: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/,
                                    message: 'لطفا یک ایمیل معتبر وارد کنید',
                                 },
                              })}
                              error={!!errors?.email}
                              helperText={errors?.email?.message}
                           />
                        </div>
                     </div>
                     <div className="flex-1 space-y-3">
                        <p className="text-sm font-bold text-[#713802]">متن پیام</p>
                        <TextField
                           color="customPink"
                           placeholder="متن پیام خود را وارد کنید"
                           multiline
                           fullWidth
                           minRows={6}
                           {...register('message', { required: { value: true, message: 'این فیلد اجباری است' } })}
                           error={!!errors?.message}
                           helperText={errors?.message?.message}
                        />
                     </div>

                     <LoadingButton
                        variant="contained"
                        fullWidth
                        type="submit"
                        size="large"
                        color="customPink2"
                        className="!mt-14"
                        startIcon={<ForwardToInboxIcon />}
                        loading={contactUsIsMutating}
                     >
                        ارسال پیام
                     </LoadingButton>
                  </form>
               </div>
            </Grid>
         </Grid>
      </div>
   );
}

export default ContactUs;
