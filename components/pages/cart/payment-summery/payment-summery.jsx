/* eslint-disable no-restricted-globals */
import { toast } from 'react-toastify';

// MUI
import { LoadingButton } from '@mui/lab';

// Icons
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

// Apis
import useSendAddress from '@/apis/basket/useSendAddress';

function PaymentSummery({ detail, setBasketStep, basketStep, chosenAddress, orderDescription }) {
   const { trigger: sendAddressTrigger, isMutating: sendAddressIsMutating } = useSendAddress();

   const processHandler = () => {
      if (basketStep === 1) {
         setBasketStep(2);
         window.scrollTo({
            top: 0,
            behavior: 'smooth',
         });
      }

      if (basketStep === 2 && chosenAddress) {
         if (isNaN(detail?.shipping_cost)) {
            toast.info('برای ادامه ی پرداخت با پشتیبانی ارتباط بگیرید');
         } else {
            const addressDetail = {
               address: chosenAddress?.id,
               order_description: orderDescription,
            };

            sendAddressTrigger(addressDetail);
         }
      } else if (basketStep === 2) {
         toast.info('آدرس خود را وارد یا انتخاب کنید');
      }
   };

   return (
      <div>
         <p className="flex items-center gap-1">
            <ErrorOutlineOutlinedIcon color="textColor" /> اطلاعات پرداخت
         </p>
         <div className="mb-5 mt-8 space-y-6 border-b border-solid border-[#E4EAF0] pb-5">
            <div className="flex items-center justify-between text-textColor">
               <p className="text-sm">تعداد کالاها</p>
               <p>{detail?.all_orders_count} محصول</p>
            </div>
            <div className="flex items-center justify-between">
               <p className="text-sm text-textColor">قیمت محصولات</p>
               <div className="flex items-center gap-1">
                  <p className="font-bold">
                     {isNaN(detail?.shipping_cost)
                        ? detail?.before_discount_price
                        : (Number(detail?.before_discount_price) - Number(detail?.shipping_cost)).toLocaleString()}
                  </p>
                  <p className="text-textColor">تومان</p>
               </div>
            </div>
            {detail?.percentage_discount_code > 0 && (
               <div className="flex items-center justify-between text-[#F2485D]">
                  <p className="text-sm">درصد کد تخفیف</p>
                  <p>% {detail?.percentage_discount_code}</p>
               </div>
            )}
            <div className="flex items-center justify-between text-[#F2485D]">
               <p className="text-sm">میزان تخفیف</p>
               <p>{(Number(detail?.before_discount_price) - Number(detail?.final_price)).toLocaleString()} تومان</p>
            </div>

            <div className="flex items-center justify-between">
               <p className="text-sm text-textColor">مبلغ بعد از تخفیف</p>
               <div className="flex items-center gap-1">
                  <p className="font-bold">
                     {isNaN(detail?.shipping_cost)
                        ? detail?.final_price
                        : (Number(detail?.final_price) - Number(detail?.shipping_cost)).toLocaleString()}
                  </p>
                  <p className="text-textColor">تومان</p>
               </div>
            </div>
            <div className="flex items-center justify-between text-textColor">
               <p className="text-sm">هزینه ارسال</p>
               <p>
                  {isNaN(detail?.shipping_cost) ? detail.shipping_cost : Number(detail?.shipping_cost).toLocaleString()}{' '}
                  تومان
               </p>
            </div>
         </div>
         <div className="mb-10 flex items-center justify-between">
            <p className="text-sm text-textColor">مبلغ نهایی</p>
            <div className="flex items-center gap-1">
               <p className="font-bold">{detail?.final_price?.toLocaleString()}</p>
               <p className="text-textColor">تومان</p>
            </div>
         </div>

         <LoadingButton
            variant="contained"
            color="customPink"
            fullWidth
            size="large"
            className="!rounded-10 !py-3 !text-white"
            onClick={processHandler}
            loading={sendAddressIsMutating}
         >
            ادامه فرایند پرداخت
         </LoadingButton>
      </div>
   );
}

export default PaymentSummery;
