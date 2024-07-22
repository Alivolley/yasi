import Image from 'next/image';

// MUI
import { Button, Grid } from '@mui/material';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Assets
import Link from 'next/link';
import bagIcon from '@/assets/icons/Bag 2.svg';
import bannerPic1 from '@/assets/images/bannerPic12.jpg';
import bannerPic2 from '@/assets/images/bannerPic13.jpg';
import bannerPic3 from '@/assets/images/bannerPic14.jpg';

function Banner() {
   return (
      <>
         <div className="max-customMd:mt-[-40px] customMd:bg-[#e5dbee] customMd:ps-16">
            <Grid container columnSpacing={{ md: '50px' }}>
               <Grid item xs={12} md={7}>
                  <div className="flex size-full flex-col justify-center py-6 customMd:py-12">
                     <p className="text-xl font-bold text-black max-customMd:hidden customMd:text-5xl">
                        اینجا کمترین قیمت گارانتی شده
                     </p>
                     <p className="text-xl font-bold text-black max-customMd:hidden customMd:mt-5 customMd:text-5xl">
                        چون فروش آغاز تعهد ماست
                     </p>
                     <p className="mt-8 hidden max-w-[700px] leading-[30px] customMd:block">
                        ما مجموعه‌ای گسترده از انواع لوازم آشپزخانه با کیفیت بالا و قیمت مناسب را برای شما فراهم
                        کرده‌ایم. از ابزارهای پخت و پز تا وسایل بسته بندی و همه چیزهایی که برای تبدیل آشپزخانه خود به یک
                        فضای کارآمد و زیبا نیاز دارید
                     </p>

                     <Link href="/categoryDetail" className="mt-11 hidden w-fit customMd:block">
                        <Button
                           color="customPinkHigh"
                           variant="contained"
                           size="large"
                           className="!rounded-10 !py-4 !text-white"
                           startIcon={<Image src={bagIcon} alt="bag" />}
                        >
                           همین حالا خرید کنید
                        </Button>
                     </Link>
                  </div>
               </Grid>
               <Grid item xs={12} md={5}>
                  <div className="size-full">
                     <Swiper
                        autoplay={{
                           delay: 3000,
                           disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        style={{ height: '100%' }}
                        modules={[Autoplay, Pagination]}
                        // eslint-disable-next-line tailwindcss/no-custom-classname
                        className="mySwiper"
                        loop
                     >
                        <SwiperSlide>
                           <div className="w-full rounded-[4px]">
                              <Image src={bannerPic1} alt="banner" className="size-full rounded-[4px]" />
                           </div>
                        </SwiperSlide>
                        <SwiperSlide>
                           <div className="w-full rounded-[4px]">
                              <Image src={bannerPic2} alt="banner" className="size-full rounded-[4px]" />
                           </div>
                        </SwiperSlide>
                        <SwiperSlide>
                           <div className="w-full rounded-[4px]">
                              <Image src={bannerPic3} alt="banner" className="size-full rounded-[4px]" />
                           </div>
                        </SwiperSlide>
                     </Swiper>
                  </div>
               </Grid>
            </Grid>
         </div>
         <div className="px-8 customMd:px-16">
            <p className="mt-8 text-center text-xl font-bold leading-[30px] text-black customMd:hidden">
               اینجا کمترین قیمت گارانتی شده، <br /> چون فروش آغاز تعهد ماست
            </p>

            <Link href="/categoryDetail" className="mt-10 block customMd:hidden">
               <Button
                  fullWidth
                  color="customPinkHigh"
                  variant="contained"
                  className="!rounded-10 !py-3 !text-white"
                  startIcon={<Image src={bagIcon} alt="bag" />}
               >
                  همین حالا خرید کنید
               </Button>
            </Link>
         </div>
      </>
   );
}

export default Banner;
