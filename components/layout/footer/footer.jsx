/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';

// MUI
import { Grid } from '@mui/material';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';

// Assets
import Link from 'next/link';
import logoPurple from '@/assets/images/logoPurple.png';

function Footer() {
   return (
      <footer className="bg-[#0A1B2F] px-8 pb-6 pt-10 text-white customMd:px-16">
         <div className="border-y border-solid border-[#ffffffa2] pb-6 pt-8 customMd:pt-12">
            <Grid container spacing={{ xs: 3, md: 0 }}>
               <Grid item xs={12} md={6}>
                  <div className="flex items-center gap-2 customMd:gap-3">
                     <div className="w-[100px] shrink-0">
                        <Image src={logoPurple} alt="logo" className="size-full" />
                     </div>
                     <div className="space-y-0.5">
                        <p className="text-2xl font-bold">یــاسی</p>
                        <p className="text-sm">فروشگاه آنلاین لوازم آشپزخانه</p>
                     </div>
                  </div>

                  <p className="mt-8 max-w-[430px] text-sm leading-[35px] text-[#DBDEEA]">
                     لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها
                     و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  </p>
               </Grid>
               <Grid item xs={12} sm={6} md={2.5}>
                  <div className="flex flex-col gap-7">
                     <p className="text-xl font-bold">دسترسی آسان</p>
                     <div className="flex flex-col gap-5 text-sm text-[#CCD5E3]">
                        <Link href="/categoryDetail">دسته بندی ها</Link>
                        <Link href="/faqs">سوالی دارید ؟</Link>
                        <Link href="/aboutUs">درباره ما</Link>
                        <Link href="/contactUs">ارتباط با ما</Link>
                     </div>
                  </div>
               </Grid>
               <Grid item xs={12} sm={6} md={3.5}>
                  <div className="flex flex-col gap-7">
                     <p className="text-xl font-bold">ارتباط با ما</p>
                     <div className="flex flex-col gap-8 text-sm text-[#CCD5E3]">
                        <div>
                           <p className="mb-3 flex items-center gap-2.5">
                              <LocationOnIcon fontSize="small" /> آدرس
                           </p>
                           <p>مشهد خیابان رضا کوچه سادات</p>
                        </div>
                        <a href="tel:02152687469">
                           <p className="mb-3 flex items-center gap-2.5">
                              <PhoneEnabledIcon fontSize="small" /> شماره تلفن
                           </p>
                           <p>021-52687469</p>
                        </a>
                        <div className="flex items-center gap-16">
                           <p>شبکه های اجتماعی : </p>
                           <div className="flex items-center gap-5">
                              <a href="/" className="transition-all duration-150 hover:text-blue-500">
                                 <TelegramIcon />
                              </a>

                              <a href="/" className="transition-all duration-150 hover:text-green-500">
                                 <WhatsAppIcon />
                              </a>

                              <a href="/" className="transition-all duration-150 hover:text-purple-500">
                                 <InstagramIcon />
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </Grid>
            </Grid>
         </div>
         <div className="flex items-center justify-center pt-4">
            <p className="text-xs text-[#7E8AAB]">
               طراحی و توسعه این سایت توسط تیم{' '}
               <a
                  href="https://roadgraph.studio/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-1 font-bold text-customPinkHigh"
               >
                  RoadGraph
               </a>{' '}
               انجام شده است
            </p>
         </div>
      </footer>
   );
}

export default Footer;
