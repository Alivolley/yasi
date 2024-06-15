import { useState } from 'react';
import { usePathname } from 'next/navigation';
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
import LogoutModal from '@/components/templates/logout-modal/logout-modal';

function ProfileLayout({ children }) {
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const pathName = usePathname();

   const userInfo = useSelector(state => state?.userInfoReducer);

   return (
      <div className="gap-6 bg-[#f5f8fc] px-5 py-16 customMd:flex customMd:px-[60px]">
         <aside className="hidden h-fit w-[378px] shrink-0 rounded-2xl bg-white px-8 py-7 customMd:block">
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
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#FCF7F7] ${
                     pathName === '/profile/information'
                        ? 'border-customPinkHigh bg-[#FCF7F7] text-customPinkHigh'
                        : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex size-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/information' ? 'bg-[#FFBEBC]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <PersonOutlineIcon color={pathName === '/profile/information' ? 'white' : 'textColor'} />
                  </div>

                  <p className="text-[15px]">اطلاعات حساب کاربری</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon fontSize="inherit" />
                  </div>
               </Link>

               <Link
                  href="/profile/address"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#FCF7F7] ${
                     pathName === '/profile/address'
                        ? 'border-customPinkHigh bg-[#FCF7F7] text-customPinkHigh'
                        : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex size-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/address' ? 'bg-[#FFBEBC]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <LocationOnOutlinedIcon color={pathName === '/profile/address' ? 'white' : 'textColor'} />
                  </div>

                  <p className="text-[15px]">آدرس های من</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon fontSize="inherit" />
                  </div>
               </Link>

               <Link
                  href="/profile/orders"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#FCF7F7] ${
                     pathName === '/profile/orders'
                        ? 'border-customPinkHigh bg-[#FCF7F7] text-customPinkHigh'
                        : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex size-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/orders' ? 'bg-[#FFBEBC]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <AccountBalanceWalletOutlinedIcon color={pathName === '/profile/orders' ? 'white' : 'textColor'} />
                  </div>

                  <p className="text-[15px]">پیگیری سفارش ها</p>

                  <div className="ms-auto">
                     <ArrowBackIosNewOutlinedIcon fontSize="inherit" />
                  </div>
               </Link>

               <Link
                  href="/profile/favorites"
                  className={`flex w-full items-center gap-4 rounded-2xl border-s-[7px] border-solid py-3.5 pe-5 ps-3 hover:bg-[#FCF7F7] ${
                     pathName === '/profile/favorites'
                        ? 'border-customPinkHigh bg-[#FCF7F7] text-customPinkHigh'
                        : 'border-transparent'
                  }`}
               >
                  <div
                     className={`flex size-11 items-center justify-center rounded-10 ${
                        pathName === '/profile/favorites' ? 'bg-[#FFBEBC]' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <FavoriteBorderIcon color={pathName === '/profile/favorites' ? 'white' : 'textColor'} />
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
               className="!rounded-10 !px-5 !py-3.5 !text-customPinkHigh"
               fullWidth
               onClick={() => setShowLogoutModal(true)}
            >
               <div className="flex w-full items-center gap-3">
                  <LogoutOutlinedIcon className="rotate-180 rounded-xl bg-customPinkLow p-2 text-customPinkHigh" />
                  <p className="pt-1">خروج از حساب کاربری</p>
               </div>
            </Button>
         </aside>
         <section className="grow">{children}</section>

         <LogoutModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
      </div>
   );
}

export default ProfileLayout;
