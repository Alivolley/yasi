import { useEffect, useState } from 'react';
import Image from 'next/image';

// MUI
import { Button, CircularProgress, TextField } from '@mui/material';

// Icons
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';

// Assets
import noAddressPic from '@/assets/images/no-address.png';

// Components
import BasketAddressCard from '../basket-address-card/basket-address-card';
import BasketAddressModal from '../basket-address-modal/basket-address-modal';

// Apis
import useGetAddress from '@/apis/profile/useGetAddress';

function AddAddressSection({ chosenAddress, setChosenAddress, orderDescription, setOrderDescription }) {
   const [showBasketAddressModal, setShowBasketAddressModal] = useState(false);
   const { data: addressData, isLoading: addressIsLoading } = useGetAddress();

   useEffect(() => {
      if (addressData?.length === 1) {
         setChosenAddress(addressData?.[0]);
      } else {
         setChosenAddress();
      }
   }, [addressData]);

   return (
      <div>
         <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white px-5 py-4">
            <p className="flex items-center gap-2 text-base">
               <MyLocationOutlinedIcon color="customPinkHigh" /> لیست آدرس های شما
            </p>

            <Button
               type="submit"
               color="customPinkHigh"
               onClick={() => setShowBasketAddressModal(true)}
               startIcon={<AddLocationAltOutlinedIcon />}
            >
               افزودن آدرس جدید
            </Button>
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
                        <BasketAddressCard
                           key={item?.id}
                           detail={item}
                           isClickable
                           onClick={() => setChosenAddress(item)}
                           isActive={item?.id === chosenAddress?.id}
                        />
                     ))}
                  </div>
               ) : (
                  <div className="mx-auto my-10 flex max-w-[370px] flex-col gap-4 text-center">
                     <p className="text-xl font-bold">شما در حال حاضر آدرسی ثبت نکرده اید</p>
                     <p className="text-sm text-textColor">آدرس خود را به لیست آدرس ها اضافه کنید</p>
                     <div className="mx-auto max-w-[250px]">
                        <Image src={noAddressPic} alt="no address" className="size-full object-cover" />
                     </div>
                  </div>
               )}
            </div>
         )}

         <div className="mt-10">
            <TextField
               label="توضیحات سفارش ( اختیاری )"
               InputLabelProps={{ sx: { fontSize: '13px' } }}
               fullWidth
               multiline
               rows={4}
               color="customPink"
               value={orderDescription}
               onChange={e => setOrderDescription(e.target.value)}
            />
         </div>

         <BasketAddressModal show={showBasketAddressModal} onClose={() => setShowBasketAddressModal(false)} />
      </div>
   );
}

export default AddAddressSection;
