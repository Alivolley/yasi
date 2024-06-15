import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

// MUI
import { Button, CircularProgress } from '@mui/material';

// Icons
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

// Assets
import noAddressPic from '@/assets/images/no-address.png';

// Components
import ProfileLayout from '@/components/layout/profile-layout/profile-layout';
import BasketAddressCard from '@/components/pages/basket/basket-address-card/basket-address-card';
import BasketAddressModal from '@/components/pages/basket/basket-address-modal/basket-address-modal';

// Apis
import useGetAddress from '@/apis/profile/useGetAddress';

function Address() {
   const [showBasketAddressModal, setShowBasketAddressModal] = useState(false);
   const { data: addressData, isLoading: addressIsLoading } = useGetAddress();

   return (
      <ProfileLayout>
         <Head>
            <title>یاسی - آدرس های من</title>
         </Head>
         <div>
            <div className="flex items-center gap-2 rounded-2xl bg-white p-7">
               <p className="text-lg font-bold text-[#050F2C]">لیست آدرس های شما</p>
               {!addressIsLoading && addressData?.length ? (
                  <p className="flex size-6 items-center justify-center rounded-full bg-customPinkHigh text-white">
                     {addressData?.length}
                  </p>
               ) : null}
            </div>

            {addressIsLoading ? (
               <div className="mt-6 flex items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : (
               <div className="mt-6">
                  {addressData?.length ? (
                     <div className="flex flex-col gap-3">
                        {addressData?.map(item => (
                           <BasketAddressCard key={item?.id} detail={item} />
                        ))}
                        <Button
                           variant="contained"
                           type="submit"
                           size="large"
                           color="customPink2"
                           className="!mt-3 !rounded-10 !py-3 !text-[#B1302E]"
                           onClick={() => setShowBasketAddressModal(true)}
                           startIcon={<AddLocationAltOutlinedIcon />}
                        >
                           افزودن آدرس جدید
                        </Button>
                     </div>
                  ) : (
                     <div className="mx-auto my-10 flex max-w-[370px] flex-col gap-4 text-center">
                        <p className="text-xl font-bold">شما در حال حاضر آدرسی ثبت نکرده اید</p>
                        <p className="text-sm text-textColor">
                           آدرس خود را به لیست آدرس ها اضافه کنید تا در زمان سفارش به راحتی، همیشه از آن استفاده کنید
                        </p>
                        <div>
                           <Image src={noAddressPic} alt="no address" className="size-full object-cover" />
                        </div>
                        <Button
                           variant="contained"
                           type="submit"
                           size="large"
                           color="customPink2"
                           className="!rounded-10 !py-3 !text-[#B1302E]"
                           onClick={() => setShowBasketAddressModal(true)}
                           startIcon={<AddLocationAltOutlinedIcon />}
                           fullWidth
                        >
                           افزودن آدرس جدید
                        </Button>
                     </div>
                  )}
               </div>
            )}
         </div>

         <BasketAddressModal show={showBasketAddressModal} onClose={() => setShowBasketAddressModal(false)} />
      </ProfileLayout>
   );
}

export default Address;
