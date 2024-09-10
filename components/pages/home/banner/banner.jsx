import Image from 'next/image';
import Link from 'next/link';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Assets
import bagIcon from '@/assets/icons/Bag 2.svg';
import bannerPic1 from '@/assets/images/bannerPic103.jpg';
import bannerPic2 from '@/assets/images/bannerPic104.jpg';
import bannerPic4 from '@/assets/images/bannerPic105.jpg';
import offersButton from '@/assets/images/offers-button.png';

// Components
import ProductCard from '@/components/templates/product-card/product-card';

// Styles
import BannerStyle from './banner.style';

function Banner({ discountProductList }) {
   return (
      <BannerStyle style={{ background: 'linear-gradient(0deg, rgba(255,255,255,1) 35%, rgba(246,243,249,1) 100%)' }}>
         <div className="px-8 py-[55px] customMd:px-16">
            <div className="customMd:grid customMd:h-[505px] customMd:grid-cols-4 customMd:gap-x-[65px]">
               <div className="relative col-span-3 customMd:h-[505px]">
                  <div
                     className="absolute start-5 top-1/2 z-[2] -translate-y-1/2 text-white customMd:start-[55px]"
                     style={{
                        MozUserSelect: 'none',
                        WebkitUserSelect: 'none',
                        msUserSelect: 'none',
                        userSelect: 'none',
                     }}
                  >
                     <p className="text-sm customMd:text-2xl">یاسی هوم</p>
                     <p className="mt-[7px] text-[16px] font-extrabold leading-[25px] customMd:mt-[13px] customMd:text-[36px] customMd:leading-[50px]">
                        اینجا کمترین قیمت گارانتی شده
                     </p>
                     <p className="text-[36px] font-extrabold leading-[50px] max-customMd:hidden">
                        چون فروش آغاز تعهد ماست
                     </p>
                     <Link
                        href="/categoryDetail"
                        className="mt-4 flex h-10 w-fit items-center gap-[6px] rounded-lg bg-[#9B7DB3] px-[16px] shadow-sm
                         customMd:mt-[34px] customMd:h-[60px] customMd:w-[233px] customMd:gap-2 customMd:rounded-10 customMd:px-[31px]"
                     >
                        <Image src={bagIcon} />
                        <p className="max-customMd:text-[13px]">همین حالا خرید کنید</p>
                     </Link>
                  </div>
                  <Swiper
                     autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                     }}
                     spaceBetween="20px"
                     pagination={{ clickable: true }}
                     style={{ height: '100%' }}
                     modules={[Autoplay, Pagination]}
                     // eslint-disable-next-line tailwindcss/no-custom-classname
                     className="mySwiper"
                     loop
                  >
                     <SwiperSlide>
                        <div className="size-full rounded-[15px] customMd:rounded-[35px]">
                           <Image
                              src={bannerPic1}
                              alt="banner"
                              className="size-full rounded-[15px] object-cover customMd:rounded-[35px]"
                           />
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className="size-full rounded-[15px] customMd:rounded-[35px]">
                           <Image
                              src={bannerPic2}
                              alt="banner"
                              className="size-full rounded-[15px] object-cover customMd:rounded-[35px]"
                           />
                        </div>
                     </SwiperSlide>
                     <SwiperSlide>
                        <div className="size-full rounded-[15px] customMd:rounded-[35px]">
                           <Image
                              src={bannerPic4}
                              alt="banner"
                              className="size-full rounded-[15px] object-cover customMd:rounded-[35px]"
                           />
                        </div>
                     </SwiperSlide>
                  </Swiper>
               </div>
               <div className="col-span-1 max-customMd:mt-[30px] customMd:flex customMd:flex-col customMd:justify-between">
                  <div className="max-customSm:px-7">
                     <Image src={offersButton} alt="btn" className="size-full" unoptimized />
                  </div>

                  <div className="max-customMd:mt-5">
                     <Swiper
                        autoplay={{
                           delay: 5000,
                           disableOnInteraction: false,
                        }}
                        spaceBetween="10px"
                        style={{ height: '100%' }}
                        modules={[Autoplay]}
                        // eslint-disable-next-line tailwindcss/no-custom-classname
                        className="mySwiper"
                        loop
                     >
                        {discountProductList?.result?.map(item => (
                           <SwiperSlide key={item?.id}>
                              <ProductCard detail={item} fullWidth />
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
            </div>
         </div>
      </BannerStyle>
   );
}

export default Banner;
