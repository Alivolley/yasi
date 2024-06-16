import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button } from '@mui/material';

// Icon
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Assets
import profilePic from '@/assets/images/userProfile.png';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';
import LogoutModal from '@/components/templates/logout-modal/logout-modal';

function Profile() {
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const pathName = usePathname();

   const userInfo = useSelector(state => state?.userInfoReducer);

   return (
      <main>
         <Head>
            <title>یاسی - پروفایل</title>
         </Head>
         <div className="hidden customMd:block">
            <ProfileLayout />
         </div>

         <div className="px-5 py-12 customMd:hidden">
            <div className="flex items-center gap-4">
               <div className="relative size-[75px]">
                  <Image alt="profile" src={userInfo?.image || profilePic} className="rounded-full object-cover" fill />
               </div>
               <div className="space-y-1.5">
                  <p className="text-xl font-bold">{userInfo?.name}</p>
                  <p className="text-[13px] text-textColor">{userInfo?.phone_number}</p>
               </div>
            </div>

            <div className="mb-2 mt-10 flex flex-col gap-2">
               <Link
                  href="/profile/information"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#c2acd8] ${
                     pathName === '/profile/information' ? 'border-[#32293c] bg-[#c2acd8]' : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex size-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/information' ? 'bg-[#eee7f4]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <PersonOutlineIcon color={pathName === '/profile/information' ? 'customPink' : 'textColor'} />
                  </div>

                  <p className="text-[15px]">اطلاعات حساب کاربری</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon fontSize="inherit" />
                  </div>
               </Link>

               <Link
                  href="/profile/address"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#c2acd8] ${
                     pathName === '/profile/address' ? 'border-[#32293c] bg-[#c2acd8]' : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex size-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/address' ? 'bg-[#eee7f4]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <LocationOnOutlinedIcon color={pathName === '/profile/address' ? 'customPink' : 'textColor'} />
                  </div>

                  <p className="text-[15px]">آدرس های من</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon fontSize="inherit" />
                  </div>
               </Link>

               <Link
                  href="/profile/orders"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#c2acd8] ${
                     pathName === '/profile/orders' ? 'border-[#32293c] bg-[#c2acd8]' : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex size-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/orders' ? 'bg-[#eee7f4]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <AccountBalanceWalletOutlinedIcon
                        color={pathName === '/profile/orders' ? 'customPink' : 'textColor'}
                     />
                  </div>

                  <p className="text-[15px]">پیگیری سفارش ها</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon fontSize="inherit" />
                  </div>
               </Link>

               <Link
                  href="/profile/favorites"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#c2acd8] ${
                     pathName === '/profile/favorites' ? 'border-[#32293c] bg-[#c2acd8]' : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex size-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/favorites' ? 'bg-[#eee7f4]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <FavoriteBorderIcon color={pathName === '/profile/favorites' ? 'customPink' : 'textColor'} />
                  </div>

                  <p className="text-[15px]">علاقه مندی ها</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon fontSize="inherit" />
                  </div>
               </Link>
            </div>

            <Button
               variant="contained"
               type="submit"
               size="large"
               color="white"
               className="!rounded-10 !px-5 !py-3.5"
               sx={{ ':hover': { color: '#000', backgroundColor: '#c2acd8' } }}
               fullWidth
               onClick={() => setShowLogoutModal(true)}
            >
               <div className="flex w-full items-center gap-3">
                  <LogoutOutlinedIcon className="rotate-180 rounded-xl bg-[#F5F8FC] p-2 text-textColor" />
                  <p className="pt-1">خروج از حساب کاربری</p>
               </div>
            </Button>
         </div>

         <LogoutModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
      </main>
   );
}

export default Profile;

export async function getServerSideProps(context) {
   const { req } = context;
   const accessToken = req?.cookies?.yasi_accessToken;
   const refreshToken = req?.cookies?.yasi_refreshToken;

   if (accessToken && refreshToken) {
      return {
         props: {},
      };
   }

   return {
      redirect: {
         destination: '/login',
      },
   };
}
