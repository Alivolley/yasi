/* eslint-disable jsx-a11y/control-has-associated-label */
import Image from 'next/image';

// MUI
import { Grid } from '@mui/material';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

// Assets
import Link from 'next/link';
import logoPic from '@/assets/images/logo.png';
import enamadIcon from '@/assets/images/enamadIcon.png';

function Footer() {
   return (
      <footer className="bg-[#0A1B2F] px-8 pb-6 pt-10 text-white customMd:px-16">
         <div className="border-y border-solid border-[#ffffffa2] pb-6 pt-8 customMd:pt-12">
            <Grid container spacing={{ xs: 3, md: 0 }}>
               <Grid item xs={12} md={6}>
                  <Link href="/" className="flex w-fit items-center gap-2 customMd:gap-3">
                     <div className="flex size-[100px] shrink-0 items-center justify-center rounded-full bg-white p-2">
                        <div className="w-full">
                           <Image src={logoPic} alt="logo" className="size-full" />
                        </div>
                     </div>
                     <div className="space-y-0.5">
                        <p className="text-2xl font-bold">یاسی هوم</p>
                        <p className="text-sm">فروشگاه آنلاین لوازم آشپزخانه</p>
                     </div>
                  </Link>

                  <p className="mt-8 max-w-[430px] text-sm leading-[35px] text-[#DBDEEA]">
                     فروشگاه اینترنتی یاسی هوم کلی لوازم و اکسسوری و دکوری آشپزخونه داره که میتونی هرجای ایران که هستی
                     سفارش بدی و درب منزل تحویل بگیری ، پس دیگه نگران خرید جهیزیه نباش
                  </p>

                  <div className="size-24 max-customMd:mt-3">
                     <a
                        referrerPolicy="origin"
                        target="_blank"
                        href="https://trustseal.enamad.ir/?id=508427&Code=twV0Bcwf02EolvbwPZhTWRUGEhcdjGSH"
                        rel="noreferrer"
                     >
                        <Image src={enamadIcon} alt="enamad" className="size-full" />
                     </a>
                     {/* <img
                           referrerPolicy="origin"
                           src="https://trustseal.enamad.ir/logo.aspx?id=508427&Code=twV0Bcwf02EolvbwPZhTWRUGEhcdjGSH"
                           alt=""
                           code="twV0Bcwf02EolvbwPZhTWRUGEhcdjGSH"
                           className="size-24"
                        /> */}
                  </div>
               </Grid>
               <Grid item xs={12} sm={6} md={2.5}>
                  <div className="flex flex-col gap-7">
                     <p className="text-xl font-bold">دسترسی آسان</p>
                     <div className="flex flex-col gap-5 text-sm text-[#CCD5E3]">
                        <Link href="/categoryDetail" className="w-fit">
                           دسته بندی ها
                        </Link>
                        <Link href="/faqs" className="w-fit">
                           سوالی دارید ؟
                        </Link>
                        <Link href="/aboutUs" className="w-fit">
                           درباره ما
                        </Link>
                        <Link href="/contactUs" className="w-fit">
                           ارتباط با ما
                        </Link>
                     </div>
                  </div>
               </Grid>
               <Grid item xs={12} sm={6} md={3.5}>
                  <div className="flex flex-col gap-7">
                     <p className="text-xl font-bold">ارتباط با ما</p>
                     <div className="flex flex-col gap-8 text-sm text-[#CCD5E3]">
                        <p>ساعت پاسخگویی در روزهای غیر تعطیل 8 صبح تا 6 عصر</p>
                        <div>
                           <p className="mb-3 flex items-center gap-2.5">
                              <LocationOnIcon fontSize="small" /> آدرس
                           </p>
                           <p>خراسان شمالی شیروان</p>
                        </div>
                        <a href="tel:09365584271" className="w-fit">
                           <p className="mb-3 flex items-center gap-2.5">
                              <PhoneEnabledIcon fontSize="small" /> شماره تلفن
                           </p>
                           <p>09365584271</p>
                        </a>
                        <div className="flex items-center gap-5">
                           <p>شبکه های اجتماعی : </p>
                           <div className="flex items-center gap-5">
                              <a
                                 href="https://zil.ink/yasii_home"
                                 target="_blank"
                                 className="transition-all duration-150 hover:text-green-500"
                                 rel="noreferrer"
                              >
                                 <WhatsAppIcon />
                              </a>

                              <a
                                 href="https://T.me/yasii_home"
                                 target="_blank"
                                 className="transition-all duration-150 hover:text-blue-500"
                                 rel="noreferrer"
                              >
                                 <TelegramIcon />
                              </a>

                              <a
                                 href="https://Www.instagram.com//yasii_home"
                                 target="_blank"
                                 className="transition-all duration-150 hover:text-purple-500"
                                 rel="noreferrer"
                              >
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
