import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Badge, Button, Fab, FormControl, IconButton, InputAdornment, TextField } from '@mui/material';

// Icons
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PercentIcon from '@mui/icons-material/Percent';

// Assets
import logoPurple from '@/assets/images/logoPurple.png';
import searchIcon from '@/assets/icons/search-icon.svg';
import categoriesIcon from '@/assets/icons/menu-categories-icon.svg';
import callIcon from '@/assets/icons/call-icon.svg';

// Components
import MobileMenu from '../mobile-menu/mobile-menu';
import SearchSection from '@/components/templates/search-section/search-section';
import HeaderCategories from '@/components/templates/header-categories/header-categories';
import ProfileDropdown from '@/components/templates/profile-dropdown/profile-dropdown';

// Apis
import useGetUserInfo from '@/apis/userInfo/useGetUserInfo';
import useGetBasket from '@/apis/basket/useGetBasket';

function Header() {
   const [showMobileMenu, setShowMobileMenu] = useState(false);
   const [showSearchSection, setShowSearchSection] = useState(false);
   const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
   const [isUserLogin, setIsUserLogin] = useState();
   const [profileDropDown, setProfileDropDown] = useState(false);
   const profileRef = useRef();
   const userInfo = useSelector(state => state?.userInfoReducer);
   const isLogin = useSelector(state => state?.loginStatusReducer);

   // eslint-disable-next-line no-unused-vars
   const getUserInfo = useGetUserInfo(isUserLogin);
   const { data: basketData } = useGetBasket(isUserLogin);

   const { pathname, query, push } = useRouter();

   useEffect(() => {
      setIsUserLogin(isLogin);
   }, [isLogin]);

   useEffect(() => {
      setShowMobileMenu(false);
   }, [pathname, query]);

   useEffect(() => {
      if (showSearchSection) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'visible';
      }
   }, [showSearchSection]);

   const { register, handleSubmit, setValue } = useForm({
      defaultValues: {
         searchInput: '',
      },
   });

   useEffect(() => {
      if (query?.productName) {
         setValue('searchInput', query.productName);
      } else {
         setValue('searchInput', '');
      }
   }, [query]);

   const formSubmit = data => {
      push(`/search?productName=${data.searchInput}&page=1`);
      setShowSearchSection(false);
   };

   return (
      <header
         className="sticky top-0 z-10 bg-white px-8 pt-5 customMd:px-16"
         style={{ boxShadow: '0px 11px 44px 23px #7e8aaba' }}
      >
         <div className="flex items-center justify-between border-solid border-borderColor pb-4 customMd:border-b">
            <div className="flex items-center gap-2 customMd:gap-11">
               <IconButton className="!p-0 customMd:!hidden" onClick={() => setShowMobileMenu(true)}>
                  <MenuOutlinedIcon />
               </IconButton>
               <Link href="/" className="flex items-center gap-2 customMd:gap-3">
                  <div className="w-[40px] shrink-0 customMd:h-16 customMd:w-[73px]">
                     <Image src={logoPurple} alt="logo" className="size-full" />
                  </div>
                  <div className="space-y-0.5">
                     <p className="text-sm font-bold customMd:text-xl">یاسی هوم</p>
                     <p className="text-[8px] text-[#58595B] customMd:text-xs">فروشگاه آنلاین لوازم آشپزخانه</p>
                  </div>
               </Link>

               <form onSubmit={handleSubmit(formSubmit)} className="relative hidden customMd:block">
                  <FormControl variant="outlined">
                     <TextField
                        placeholder="جستجو"
                        className="customLg:w-[300px]"
                        color="customPink"
                        sx={{ bgcolor: '#F5F8FC', borderRadius: '10px' }}
                        autoComplete="off"
                        {...register('searchInput', { required: { value: true } })}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <IconButton type="submit" edge="start">
                                    <Image src={searchIcon} alt="search Icon" />
                                 </IconButton>
                              </InputAdornment>
                           ),
                           onFocus: () => setShowSearchSection(true),
                        }}
                     />
                  </FormControl>
                  <div
                     className={`absolute start-0 top-full z-[1] w-[500px] rounded-2xl bg-white p-5 transition-all duration-300 customLg:w-[800px] ${
                        showSearchSection ? 'visible opacity-100' : 'invisible opacity-0'
                     }`}
                     style={{ boxShadow: '0px 11px 44px 23px #7E8AAB14' }}
                  >
                     <SearchSection onClose={() => setShowSearchSection(false)} isUserLogin={isUserLogin} />
                  </div>
               </form>
            </div>

            <div className="hidden items-stretch gap-1 customMd:flex lg:gap-3">
               {isUserLogin && (
                  <Link href="/cart">
                     <Fab
                        sx={{
                           width: '60px',
                           height: '60px',
                           borderRadius: '10px',
                           color: '#626E94',
                           border: '1px solid #E4EAF0',
                        }}
                        color="white"
                     >
                        <Badge
                           badgeContent={basketData?.all_orders_count}
                           anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                           }}
                           sx={{
                              '& .MuiBadge-badge': {
                                 fontSize: 10,
                                 width: 16,
                                 height: 16,
                                 minWidth: 16,
                                 backgroundColor: '#e5dbee',
                              },
                           }}
                        >
                           <ShoppingBasketOutlinedIcon />
                        </Badge>
                     </Fab>
                  </Link>
               )}
               {!isUserLogin ? (
                  <Link href="/login">
                     <Button
                        variant="contained"
                        color="customPink"
                        className="!h-[60px] !rounded-10 !text-white"
                        size="large"
                        sx={{ ':hover': { backgroundColor: '#866d9f' } }}
                     >
                        ورود / ثبت نام
                     </Button>
                  </Link>
               ) : (
                  <>
                     <div
                        className={`flex min-w-[193px] cursor-pointer items-center justify-center gap-5 rounded-10 px-2 text-white transition-all duration-200 ${
                           profileDropDown ? 'bg-[#866d9f]' : 'bg-customPink'
                        }`}
                        ref={profileRef}
                        onMouseEnter={() => setProfileDropDown(true)}
                        onMouseLeave={() => setProfileDropDown(false)}
                     >
                        <PersonOutlinedIcon fontSize="small" />
                        {userInfo?.name || userInfo?.phone_number}
                        <KeyboardArrowDownIcon
                           className={`!transition-all !duration-200 ${profileDropDown ? 'rotate-180' : ''}`}
                        />
                     </div>

                     <ProfileDropdown
                        profileDropDown={profileDropDown}
                        setProfileDropDown={setProfileDropDown}
                        profileRef={profileRef}
                        isAdmin={userInfo?.is_admin}
                     />
                  </>
               )}
            </div>

            <div className="flex items-center customMd:hidden">
               {!isUserLogin ? (
                  <Link href="/login">
                     <Fab
                        sx={{
                           width: '38px',
                           height: '38px',
                           borderRadius: '8px',
                           color: '#866d9f',
                        }}
                        color="customPinkLow"
                     >
                        <PersonOutlinedIcon />
                     </Fab>
                  </Link>
               ) : (
                  <Link href="/cart">
                     <Fab
                        sx={{
                           width: '38px',
                           height: '38px',
                           borderRadius: '8px',
                           color: '#626E94',
                        }}
                        color="customPinkLow"
                     >
                        <Badge
                           badgeContent={basketData?.all_orders_count}
                           anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                           }}
                           sx={{
                              '& .MuiBadge-badge': {
                                 fontSize: 10,
                                 width: 16,
                                 height: 16,
                                 minWidth: 16,
                                 backgroundColor: '#dccfe9',
                              },
                           }}
                        >
                           <ShoppingBasketOutlinedIcon />
                        </Badge>
                     </Fab>
                  </Link>
               )}
            </div>
         </div>

         <div className="hidden items-center justify-between py-3 customMd:flex">
            <div className="relative flex items-center gap-1 customLg:gap-6">
               <Button
                  size="small"
                  color="textColor"
                  startIcon={<Image src={categoriesIcon} alt="categories" />}
                  endIcon={
                     <KeyboardArrowDownIcon
                        className={`!transition-all !duration-300 ${showCategoriesMenu ? 'rotate-180' : ''}`}
                     />
                  }
                  onMouseEnter={() => setShowCategoriesMenu(true)}
                  onMouseLeave={() => setShowCategoriesMenu(false)}
               >
                  دسته بندی ها
               </Button>

               <div
                  className={`absolute start-0 top-full z-[1] w-[700px] rounded-2xl bg-white p-5 transition-all duration-300 lg:w-[900px] ${
                     showCategoriesMenu ? 'visible opacity-100' : 'invisible opacity-0'
                  }`}
                  style={{
                     boxShadow: '0px 11px 44px 23px #7E8AAB14',
                  }}
                  onMouseEnter={() => setShowCategoriesMenu(true)}
                  onMouseLeave={() => setShowCategoriesMenu(false)}
               >
                  <HeaderCategories />
               </div>

               <Link href="/categoryDetail?ordering=sales">
                  <Button size="small" color="textColor" startIcon={<WhatshotIcon />}>
                     پر فروش ترین ها
                  </Button>
               </Link>
               <Link href="/categoryDetail?ordering=created">
                  <Button size="small" color="textColor" startIcon={<FiberNewIcon />}>
                     جدیدترین ها
                  </Button>
               </Link>
               <Link href="/categoryDetail?has_discount=true">
                  <Button
                     size="small"
                     color="textColor"
                     startIcon={<PercentIcon className="rounded-full border border-solid p-0.5 !text-xs" />}
                  >
                     تخفیف ها و پیشنهادات
                  </Button>
               </Link>
            </div>

            <div className="flex items-center gap-4 text-xs text-textColor customLg:gap-6">
               <Link href="/faqs" className="hidden hover:text-[#977ab3] lg:block">
                  سوالی دارید ؟
               </Link>
               <Link href="/aboutUs" className=" hover:text-[#977ab3]">
                  درباره ی ما
               </Link>
               <Link href="/contactUs" className=" hover:text-[#977ab3]">
                  ارتباط با ما
               </Link>
               <a href="tel:09907801869" className="flex items-center gap-1 hover:text-[#977ab3]">
                  <p>09907801869</p>
                  <Image src={callIcon} alt="phone number" />
               </a>
            </div>
         </div>
         <div
            className={`fixed inset-x-0 bottom-0 top-[155px] bg-[#0000004D] transition-all duration-300
            ${showSearchSection || showCategoriesMenu ? 'visible opacity-100' : 'invisible opacity-0'}`}
         />
         <MobileMenu open={showMobileMenu} onClose={() => setShowMobileMenu(false)} isUserLogin={isUserLogin} />
      </header>
   );
}

export default Header;
