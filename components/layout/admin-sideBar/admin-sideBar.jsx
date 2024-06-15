import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Button, IconButton, useMediaQuery, useTheme } from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import PercentIcon from '@mui/icons-material/Percent';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeToStatusTrue } from '@/store/reducers/pAdminSideBarStatus';

// Assets
import profilePic from '@/assets/images/userProfile.png';

// Components
import LogoutModal from '@/components/templates/logout-modal/logout-modal';

// Apis
import useGetUserInfo from '@/apis/userInfo/useGetUserInfo';

// Utils
import permissions from '@/utils/permission';

function AdminSideBar({ isMobile, onClose }) {
   const [showLogoutModal, setShowLogoutModal] = useState(false);
   const userInfo = useSelector(state => state?.userInfoReducer);
   const isLogin = useSelector(state => state?.loginStatusReducer);
   const isSideBarOpen = useSelector(state => state?.pAdminSideBarStatus);

   const { pathname } = useRouter();
   const dispatch = useDispatch();
   const theme = useTheme();
   const isTablet = useMediaQuery(theme.breakpoints.down('md'));

   // eslint-disable-next-line no-unused-vars
   const getUserInfo = useGetUserInfo(isLogin);

   useEffect(() => {
      if (isTablet) {
         dispatch(changeToStatusTrue());
      }
   }, [isTablet]);

   return (
      <aside
         className={`h-fit shrink-0 rounded-b-2xl bg-white px-8 py-4 transition-all duration-500 customMd:p-8 ${
            isSideBarOpen ? 'customXs:w-[330px]' : 'w-[137px]'
         } ${isMobile ? 'customMd:hidden' : 'sticky top-0 z-[2] hidden customMd:block'}`}
      >
         <div className="flex justify-end customMd:hidden">
            <IconButton onClick={onClose}>
               <CloseIcon />
            </IconButton>
         </div>
         <div
            className={`flex flex-wrap items-center border-b border-solid border-[#E4EAF0] pb-3 transition-all duration-500 ${
               isSideBarOpen ? 'gap-4' : 'gap-2.5'
            }`}
         >
            <div
               className={`relative transition-all duration-500 ${
                  isSideBarOpen ? 'size-[65px]' : 'mx-auto size-[40px]'
               }`}
            >
               <Image alt="profile" src={userInfo?.image || profilePic} className="rounded-full object-cover" fill />
            </div>
            <div className={`space-y-3 transition-all duration-500 ${isSideBarOpen ? '' : 'w-full'}`}>
               <p
                  className={`font-bold text-[#B1302E] transition-all duration-500 ${
                     isSideBarOpen ? 'text-base' : 'text-center text-xs'
                  }`}
               >
                  {userInfo?.name}
               </p>
               {isSideBarOpen && <p className="text-xs text-textColor">{userInfo?.phone_number}</p>}
            </div>
         </div>

         <div className="mb-3 mt-8 flex flex-col gap-3">
            <Link
               href="/adminPanel/products"
               className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                  pathname === '/adminPanel/products' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
               }`}
            >
               <div
                  className={`flex size-11 items-center justify-center rounded-10 ${
                     pathname === '/adminPanel/products' ? 'bg-customPinkLow' : 'bg-[#F5F8FC]'
                  }`}
               >
                  <AutoAwesomeMotionOutlinedIcon
                     color={pathname === '/adminPanel/products' ? 'customPinkHigh' : 'textColor'}
                  />
               </div>
               {isSideBarOpen && <p className="text-[15px]">محصولات</p>}
            </Link>
            <Link
               href="/adminPanel/orders"
               className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                  pathname === '/adminPanel/orders' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
               }`}
            >
               <div
                  className={`flex size-11 items-center justify-center rounded-10 ${
                     pathname === '/adminPanel/orders' ? 'bg-customPinkLow' : 'bg-[#F5F8FC]'
                  }`}
               >
                  <TakeoutDiningOutlinedIcon
                     color={pathname === '/adminPanel/orders' ? 'customPinkHigh' : 'textColor'}
                  />
               </div>
               {isSideBarOpen && <p className="text-[15px]">سفارشات</p>}
            </Link>
            <Link
               href="/adminPanel/users"
               className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                  pathname === '/adminPanel/users' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
               }`}
            >
               <div
                  className={`flex size-11 items-center justify-center rounded-10 ${
                     pathname === '/adminPanel/users' ? 'bg-customPinkLow' : 'bg-[#F5F8FC]'
                  }`}
               >
                  <PeopleAltOutlinedIcon color={pathname === '/adminPanel/users' ? 'customPinkHigh' : 'textColor'} />
               </div>
               {isSideBarOpen && <p className="text-[15px]">کابران</p>}
            </Link>

            {(userInfo?.is_super_admin || userInfo?.permissions?.includes(permissions?.VIEW_REPORTS?.LIST)) && (
               <Link
                  href="/adminPanel/reports"
                  className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                     pathname === '/adminPanel/reports' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
                  }`}
               >
                  <div
                     className={`flex size-11 items-center justify-center rounded-10 ${
                        pathname === '/adminPanel/reports' ? 'bg-customPinkLow' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <DescriptionOutlinedIcon
                        color={pathname === '/adminPanel/reports' ? 'customPinkHigh' : 'textColor'}
                     />
                  </div>
                  {isSideBarOpen && <p className="text-[15px]">گزارشات</p>}
               </Link>
            )}
            {(userInfo?.is_super_admin || userInfo?.permissions?.includes(permissions?.DISCOUNT_CODE?.LIST)) && (
               <Link
                  href="/adminPanel/discounts"
                  className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                     pathname === '/adminPanel/discounts' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
                  }`}
               >
                  <div
                     className={`flex size-11 items-center justify-center rounded-10 ${
                        pathname === '/adminPanel/discounts' ? 'bg-customPinkLow' : 'bg-[#F5F8FC]'
                     }`}
                  >
                     <PercentIcon color={pathname === '/adminPanel/discounts' ? 'customPinkHigh' : 'textColor'} />
                  </div>
                  {isSideBarOpen && <p className="text-[15px]">تخفیفات</p>}
               </Link>
            )}

            <Link
               href="/adminPanel/tickets"
               className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                  pathname === '/adminPanel/tickets' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
               }`}
            >
               <div
                  className={`flex size-11 items-center justify-center rounded-10 ${
                     pathname === '/adminPanel/tickets' ? 'bg-customPinkLow' : 'bg-[#F5F8FC]'
                  }`}
               >
                  <ConfirmationNumberOutlinedIcon
                     color={pathname === '/adminPanel/tickets' ? 'customPinkHigh' : 'textColor'}
                  />
               </div>
               {isSideBarOpen && <p className="text-[15px]">تیکت ها</p>}
            </Link>
            <Link
               href="/adminPanel/information"
               className={`flex w-full items-center gap-4 rounded-2xl p-3 hover:bg-[#FCF7F7] ${
                  pathname === '/adminPanel/information' ? 'bg-[#FCF7F7] text-customPinkHigh' : ''
               }`}
            >
               <div
                  className={`flex size-11 items-center justify-center rounded-10 ${
                     pathname === '/adminPanel/information' ? 'bg-customPinkLow' : 'bg-[#F5F8FC]'
                  }`}
               >
                  <RecentActorsOutlinedIcon
                     color={pathname === '/adminPanel/information' ? 'customPinkHigh' : 'textColor'}
                  />
               </div>
               {isSideBarOpen && <p className="text-[15px]">اطلاعات</p>}
            </Link>
         </div>

         <Button
            variant="contained"
            size="large"
            color="white"
            className="!rounded-10 !px-3 !py-2.5 !text-customPinkHigh"
            fullWidth
            onClick={() => setShowLogoutModal(true)}
         >
            <div className="flex w-full items-center gap-3">
               <LogoutOutlinedIcon className="rotate-180 rounded-xl bg-customPinkLow p-2.5 text-customPinkHigh" />
               {isSideBarOpen && <p>خروج از حساب کاربری</p>}
            </div>
         </Button>

         <LogoutModal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
      </aside>
   );
}

export default AdminSideBar;
