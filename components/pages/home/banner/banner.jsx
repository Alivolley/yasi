import Image from 'next/image';

// MUI
import { Button, Grid } from '@mui/material';

// Assets
import Link from 'next/link';
import bannerModel from '@/assets/images/banner-home-model.png';
import bagIcon from '@/assets/icons/Bag 2.svg';

// Styles
import BannerStyle from './banner.style';

function Banner() {
   return (
      <>
         <BannerStyle className="px-8 customMd:px-16">
            <Grid container>
               <Grid item xs={12} md={6}>
                  <div className="flex size-full flex-col justify-center py-6 customMd:py-12">
                     <p className="text-xl font-bold text-[#284566] customMd:text-5xl">بـا یاسی هوم</p>
                     <p className="text-xl font-bold text-[#284566] customMd:mt-5 customMd:text-5xl">
                        آشپزخانه ای خاص داشته باش
                     </p>
                     <p className="mt-8 hidden leading-[30px] customMd:block">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است
                        چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
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
               <Grid item xs={12} md={6}>
                  <div className="flex h-full flex-col justify-center">
                     <div className="w-full">
                        <Image src={bannerModel} alt="banner" className="size-full" />
                     </div>
                  </div>
               </Grid>
            </Grid>
         </BannerStyle>
         <div className="px-8 customMd:px-16">
            <p className="mt-8 text-sm leading-[30px] text-[#62768C] customMd:hidden">
               لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و
               متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
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
