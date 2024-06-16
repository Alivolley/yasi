import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MuiOtpInput } from 'mui-one-time-password-input';

// Icons
import CachedIcon from '@mui/icons-material/Cached';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Assets
import { toast } from 'react-toastify';
import LoginStyle from './login.style';
import logoPurple from '@/assets/images/logoPurple.png';

// Components
import CountdownLogin from '@/components/templates/countdown-Login/countdown-Login';

// Apis
import useVerificationCode from '@/apis/login/useVerificationCode';
import useSendCode from '@/apis/login/useSendCode';
import useSendPassword from '@/apis/login/useSendPassword';

function Login() {
   const [loginStep, setLoginStep] = useState(1);
   const [phoneNumber, setPhoneNumber] = useState('');
   const [codeValue, setCodeValue] = useState('');
   const [passwordValue, setPasswordValue] = useState('');
   const [disableResend, setDisableResend] = useState(true);
   const [showPassword, setShowPassword] = useState(false);
   const { back } = useRouter();

   const { trigger: verificationCodeTrigger, isMutating: verificationCodeIsMutating } = useVerificationCode();
   const { trigger: sendCodeTrigger, isMutating: sendCodeIsMutating } = useSendCode();
   const { trigger: sendPasswordTrigger, isMutating: sendPasswordIsMutating } = useSendPassword();

   const sendPhoneNumber = () => {
      if (phoneNumber) {
         verificationCodeTrigger(
            { phone_number: phoneNumber },
            {
               onSuccess: () => {
                  setLoginStep(2);
               },
            }
         );
      }
   };

   const sendCode = () => {
      const newData = {
         phone_number: phoneNumber,
         code: codeValue,
      };

      sendCodeTrigger(newData, {
         onSuccess: res => {
            if (!res.is_admin) {
               back();
            } else {
               setLoginStep(3);
            }
         },
      });
   };

   const sendPassword = () => {
      const newData = {
         phone_number: phoneNumber,
         code: codeValue,
         password: passwordValue,
      };

      sendPasswordTrigger(newData, {
         onSuccess: () => {
            back();
         },
      });
   };

   const showPhonNumberError = () => {
      toast.error('شماره تلفن معتبر نیست');
   };

   return (
      <LoginStyle className="fixed inset-0 px-5 py-12 customMd:p-16">
         <Head>
            <title>یاسی - ورود</title>
         </Head>
         <div className="h-full max-w-[486px] rounded-2xl bg-white p-7 2xl:max-w-[550px]" id="container">
            <Link href="/" className="flex w-fit items-center gap-2 customMd:gap-3">
               <div className="w-[73px] shrink-0 customMd:h-16">
                  <Image src={logoPurple} alt="logo" className="size-full" />
               </div>
               <div className="space-y-0.5">
                  <p className="text-xl font-bold">یــاسی</p>
                  <p className="text-xs text-[#58595B]">فروشگاه آنلاین لوازم آشپزخانه</p>
               </div>
            </Link>
            {loginStep === 1 ? (
               <>
                  <div className="mt-10">
                     <p className="text-xl font-bold customMd:text-2xl">ورود - ثبت نام</p>
                     <p className="mt-5 text-sm text-textColor customMd:text-base">
                        برای ورود به یاسی ابتدا شماره خود را وارد کنید
                     </p>
                  </div>

                  <div className="mt-14">
                     <TextField
                        label="شماره تلفن"
                        fullWidth
                        type="number"
                        color="customPink"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        onKeyDown={e => {
                           if (e.key === 'Enter') {
                              if (/^09\d{9}$/g.test(phoneNumber)) {
                                 sendPhoneNumber();
                              } else {
                                 showPhonNumberError();
                              }
                           }
                        }}
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
                     />
                  </div>
               </>
            ) : loginStep === 2 ? (
               <>
                  <div className="mt-10">
                     <p className="text-xl font-bold customMd:text-2xl">ورود با رمز یکبار مصرف</p>
                     <p className="mb-2 mt-5 text-sm text-textColor customMd:text-base">
                        لطفا کد تایید ارسال شده به شماره {phoneNumber} را وارد کنید
                     </p>
                     <Button
                        startIcon={<BorderColorIcon className="!text-sm" />}
                        size="small"
                        onClick={() => {
                           setLoginStep(1);
                           setCodeValue('');
                        }}
                     >
                        ویرایش شماره
                     </Button>
                  </div>
                  <div className="mt-12" dir="ltr">
                     <MuiOtpInput
                        value={codeValue}
                        onChange={e => setCodeValue(e)}
                        length={5}
                        TextFieldsProps={{ type: 'number' }}
                        onKeyDown={e => {
                           if (e.key === 'Enter') {
                              if (codeValue.length === 5) {
                                 sendCode();
                              }
                           }
                        }}
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
                     />

                     <CountdownLogin initialCount={130} onComplete={() => setDisableResend(false)} />
                  </div>
               </>
            ) : loginStep === 3 ? (
               <>
                  <div className="mt-10">
                     <p className="text-xl font-bold customMd:text-2xl">شماره شما یک ادمین است</p>
                     <p className="mb-3 mt-5 text-sm text-textColor customMd:text-base">
                        لطفا رمز عبور خود را وارد کنید
                     </p>
                     <Button
                        startIcon={<BorderColorIcon className="!text-sm" />}
                        size="small"
                        onClick={() => {
                           setLoginStep(1);
                           setCodeValue('');
                           setPasswordValue('');
                        }}
                     >
                        ویرایش شماره
                     </Button>
                  </div>

                  <div className="mt-10">
                     <FormControl variant="outlined" fullWidth>
                        <InputLabel color="customPink">رمز عبور</InputLabel>
                        <OutlinedInput
                           type={showPassword ? 'text' : 'password'}
                           color="customPink"
                           autoComplete="off"
                           value={passwordValue}
                           onChange={e => setPasswordValue(e.target.value)}
                           onKeyDown={e => {
                              if (e.key === 'Enter') {
                                 if (passwordValue) {
                                    sendPassword();
                                 }
                              }
                           }}
                           endAdornment={
                              <InputAdornment position="end">
                                 <IconButton onClick={() => setShowPassword(prev => !prev)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                 </IconButton>
                              </InputAdornment>
                           }
                           label="رمز عبور"
                        />
                     </FormControl>
                  </div>
               </>
            ) : null}

            <div className="space-y-4 self-end">
               {loginStep === 2 && (
                  <LoadingButton
                     fullWidth
                     className="!rounded-10 !py-3.5"
                     variant="outlined"
                     size="large"
                     color="customPink"
                     type="submit"
                     endIcon={<CachedIcon />}
                     disabled={disableResend}
                     onClick={sendPhoneNumber}
                     loading={verificationCodeIsMutating}
                  >
                     دریافت مجدد کد تایید
                  </LoadingButton>
               )}

               <LoadingButton
                  fullWidth
                  className={`!rounded-10 !py-3.5 ${verificationCodeIsMutating ? '' : '!text-white'}`}
                  variant="contained"
                  size="large"
                  color="customPink"
                  onClick={
                     loginStep === 1
                        ? sendPhoneNumber
                        : loginStep === 2
                          ? sendCode
                          : loginStep === 3
                            ? sendPassword
                            : null
                  }
                  loading={verificationCodeIsMutating || sendCodeIsMutating || sendPasswordIsMutating}
               >
                  ادامه
               </LoadingButton>
            </div>
         </div>
      </LoginStyle>
   );
}

export default Login;
