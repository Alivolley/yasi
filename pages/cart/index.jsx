import Head from 'next/head';
import { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button, CircularProgress, Dialog, Fab, IconButton, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';

// Components
import Link from 'next/link';
import PaymentSummery from '@/components/pages/cart/payment-summery/payment-summery';
import BasketCard from '@/components/pages/cart/basket-card/basket-card';
import ConfirmModal from '@/components/templates/confirm-modal/confirm-modal';
import AddAddressSection from '@/components/pages/basket/add-address-section/add-address-section';

// Apis
import useGetBasket from '@/apis/basket/useGetBasket';
import useDeleteBasket from '@/apis/basket/useDeleteBasket';
import useApplyCode from '@/apis/basket/useApplyCode';

function Cart() {
   const [basketStep, setBasketStep] = useState(1);
   const [showDeleteBasketModal, setShowDeleteBasketModal] = useState(false);
   const [chosenAddress, setChosenAddress] = useState();
   const [orderDescription, setOrderDescription] = useState('');
   const [discountValue, setDiscountValue] = useState('');
   const [loading, setLoading] = useState(true);
   const [showDiscountModal, setShowDiscountModal] = useState(false);
   const isLogin = useSelector(state => state?.loginStatusReducer);

   const { data: basketData } = useGetBasket(isLogin);
   const { trigger: deleteBasketTrigger, isMutating: deleteBasketIsMutating } = useDeleteBasket();

   const closeDiscountModalHandler = () => {
      setDiscountValue('');
      setShowDiscountModal(false);
   };
   const { trigger: applyCodeTrigger, isMutating: applyCodeIsMutating } = useApplyCode(closeDiscountModalHandler);

   useEffect(() => {
      if (basketData) {
         setLoading(false);
      }
   }, [basketData]);

   const deleteBasketHandler = () => {
      deleteBasketTrigger(null, {
         onSuccess: () => {
            setShowDeleteBasketModal(false);
         },
      });
   };

   const enableDiscountHandler = () => {
      if (discountValue.trim()) {
         applyCodeTrigger(discountValue);
      }
   };

   return (
      <div className="bg-[#fcf7f7] p-8 customMd:px-16 customLg:py-16">
         <Head>
            <title>یاسی - سبد خرید</title>
         </Head>
         {loading ? (
            <div className="my-12 flex w-full items-center justify-center">
               <CircularProgress color="customPink" />
            </div>
         ) : basketData?.all_orders_count ? (
            <div className="flex flex-col gap-6 customMd:flex-row">
               <div className="grow">
                  {basketStep === 1 ? (
                     <>
                        <div className="flex items-center justify-between rounded-2xl bg-white p-5">
                           <p className="flex items-center gap-2 text-customBlue">
                              <ShoppingBasketOutlinedIcon /> سبد خرید
                              <span className="flex size-6 items-center justify-center rounded-full bg-customPinkHigh text-sm text-white">
                                 {basketData?.all_orders_count}
                              </span>
                           </p>
                           <IconButton
                              sx={{ border: '1px solid #626e945e' }}
                              onClick={() => setShowDeleteBasketModal(true)}
                           >
                              <DeleteOutlineOutlinedIcon color="textColor" />
                           </IconButton>
                        </div>
                        <div className="flex items-center gap-4 space-y-5 overflow-auto pb-5 customMd:mt-5 customMd:block customMd:pb-0">
                           {basketData?.orders?.map(item => (
                              <BasketCard
                                 key={`${item?.product_color_id}-${item?.product_color?.product_id}`}
                                 detail={item}
                              />
                           ))}
                        </div>
                     </>
                  ) : (
                     <div>
                        <div className="flex items-center justify-between rounded-2xl bg-white px-5 py-4">
                           <p className="flex items-center gap-2 text-base">
                              <DiscountOutlinedIcon color="customPinkHigh" /> افزودن کد تخفیف
                           </p>

                           <Fab
                              sx={{ width: '38px', height: '38px', borderRadius: '8px' }}
                              color="customPinkLow"
                              onClick={() => setShowDiscountModal(true)}
                           >
                              <AddIcon color="customPinkHigh" />
                           </Fab>
                        </div>
                        <div className="mt-5">
                           <AddAddressSection
                              chosenAddress={chosenAddress}
                              setChosenAddress={setChosenAddress}
                              orderDescription={orderDescription}
                              setOrderDescription={setOrderDescription}
                           />
                        </div>
                     </div>
                  )}
               </div>
               <div className="h-fit shrink-0 rounded-2xl bg-white p-5 customMd:w-[300px] customLg:w-[420px]">
                  <PaymentSummery
                     detail={basketData}
                     setBasketStep={setBasketStep}
                     basketStep={basketStep}
                     chosenAddress={chosenAddress}
                     orderDescription={orderDescription}
                  />
               </div>
            </div>
         ) : (
            <div className="mt-5 flex flex-col items-center justify-center gap-4 rounded-10 bg-white px-5 py-10">
               <p className="text-center text-lg text-textColor">سبد خرید شما خالی است</p>
               <p className="text-center text-2xl font-bold">برای خرید همین حالا اقدام کن 😀</p>
               <Link href="/categoryDetail" className="mt-4">
                  <Button color="customPink" variant="contained" className="!px-16 !text-white">
                     فروشگاه
                  </Button>
               </Link>
            </div>
         )}

         <Dialog open={showDiscountModal} onClose={closeDiscountModalHandler}>
            <div className="bg-white p-5 customSm:w-[350px] customSm:px-10">
               <div className="space-y-3">
                  <p className="text-base">کد تخفیف</p>

                  <TextField
                     InputLabelProps={{ sx: { fontSize: '13px' } }}
                     fullWidth
                     color="customPink"
                     value={discountValue}
                     onChange={e => setDiscountValue(e.target.value)}
                     onKeyDown={e => {
                        if (e.key === 'Enter') {
                           if (discountValue) {
                              enableDiscountHandler();
                           }
                        }
                     }}
                  />
               </div>

               <div className="mt-5 flex items-center gap-3">
                  <LoadingButton
                     variant="contained"
                     color="customPink2"
                     fullWidth
                     onClick={enableDiscountHandler}
                     loading={applyCodeIsMutating}
                     className={`!flex-[2] !whitespace-nowrap !rounded-10 ${
                        applyCodeIsMutating ? '!text-transparent' : ''
                     }`}
                  >
                     اعمال کد
                  </LoadingButton>

                  <Button
                     variant="outlined"
                     color="textColor"
                     fullWidth
                     className="!flex-[1] !rounded-10"
                     onClick={closeDiscountModalHandler}
                     disabled={applyCodeIsMutating}
                  >
                     بازگشت
                  </Button>
               </div>
            </div>
         </Dialog>

         <ConfirmModal
            open={showDeleteBasketModal}
            closeModal={() => setShowDeleteBasketModal(false)}
            title="آیا از حذف کل سبد خرید مطمئن هستید ؟"
            confirmHandler={deleteBasketHandler}
            confirmLoading={deleteBasketIsMutating}
         />
      </div>
   );
}

export default Cart;

export async function getServerSideProps(context) {
   const { req } = context;
   const accessToken = req?.cookies?.yasi_accessToken;
   const refreshToken = req?.cookies?.yasi_refreshToken;

   if (accessToken && refreshToken) {
      return {
         props: {},
      };
   }
   return {
      redirect: {
         destination: '/login',
      },
   };
}
