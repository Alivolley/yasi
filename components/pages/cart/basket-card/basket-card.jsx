import Link from 'next/link';
import Image from 'next/image';

// MUI
import { IconButton } from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// Assets
import discountShape from '@/assets/images/discount-shape.png';
import noImage from '@/assets/images/noImage.png';

// Apis
import useAddToBasket from '@/apis/basket/useAddToBasket';
import useRemoveFromBasket from '@/apis/basket/useRemoveFromBasket';

function BasketCard({ detail }) {
   const { isMutating: addToBasketIsMutating, trigger: addToBasketTrigger } = useAddToBasket();
   const { isMutating: removeFromBasketIsMutating, trigger: removeFromBasketTrigger } = useRemoveFromBasket();

   const addToBasketHandler = () => {
      const productObj = {
         product_color_id: detail?.product_color_id,
         product_count: Number(detail?.count) + 1,
      };

      addToBasketTrigger(productObj);
   };

   const removeFromBasketHandler = () => {
      const productObj = {
         product_color_id: detail?.product_color_id,
         product_count: Number(detail?.count) - 1,
      };

      removeFromBasketTrigger(productObj);
   };

   return (
      <>
         <div className="hidden gap-5 rounded-2xl bg-white p-5 customMd:flex">
            <Link
               href={`/productDetail/${detail?.product_color?.product_title}`}
               className="relative block h-[123px] w-[133px] shrink-0 rounded-xl bg-[#f5f8fc]"
            >
               <Image src={detail?.product_color?.cover || noImage} alt="product" className="object-cover p-4" fill />
            </Link>
            <div className="flex grow justify-between">
               <div className="flex flex-col justify-between">
                  <p className="font-bold">{detail?.product_color?.product_title}</p>
                  <div className="flex items-center gap-2 text-sm text-textColor">
                     <p>رنگ انتخاب شده : </p>
                     <div
                        className="size-6 shrink-0 rounded-full"
                        style={{ backgroundColor: detail?.product_color?.product_color }}
                     />
                  </div>
                  <div />
               </div>
               <div className="flex flex-col items-end justify-between gap-7">
                  <div className="flex h-10 items-center gap-2">
                     {detail?.percentage > 0 && (
                        <>
                           <div className="relative">
                              <Image src={discountShape} alt="discount" />
                              <p className="absolute inset-x-1/4 top-[13px] text-10 text-white">
                                 {detail?.percentage}%
                              </p>
                           </div>
                           <p className="text-sm text-[#B1B5C4] line-through">
                              {Number(detail?.before_discount_price).toLocaleString()} تومان
                           </p>
                        </>
                     )}
                  </div>
                  <p className="text-customPinkHigh">{Number(detail?.total_price).toLocaleString()} تومان</p>
                  <div className="flex items-center justify-center gap-3">
                     <IconButton
                        className="!border !border-solid !border-customPink"
                        sx={{ width: '30px', height: '30px' }}
                        onClick={addToBasketHandler}
                        disabled={
                           addToBasketIsMutating ||
                           removeFromBasketIsMutating ||
                           detail?.count === detail?.product_color?.product_stock
                        }
                     >
                        <AddIcon color="customPink" className="!text-base" />
                     </IconButton>

                     <div className="flex flex-col items-center">
                        <p className="text-lg font-bold text-customPinkHigh">
                           {addToBasketIsMutating || removeFromBasketIsMutating ? '...' : detail?.count}
                        </p>
                        {detail?.count === detail?.product_color?.product_stock && (
                           <p className="text-10 text-textColor">حداکثر</p>
                        )}
                     </div>
                     <IconButton
                        className={detail?.count > 1 ? '!border !border-solid !border-textColor' : ''}
                        sx={{ width: '30px', height: '30px' }}
                        onClick={removeFromBasketHandler}
                        disabled={addToBasketIsMutating || removeFromBasketIsMutating}
                     >
                        {detail?.count > 1 ? (
                           <RemoveIcon color="textColor" className="!text-base" />
                        ) : (
                           <DeleteOutlineOutlinedIcon color="textColor" className="!text-2xl" />
                        )}
                     </IconButton>
                  </div>
               </div>
            </div>
         </div>

         <div className="w-[230px] shrink-0 rounded-10 bg-white p-3 customMd:hidden">
            <Link
               href={`/productDetail/${detail?.product_color?.product_title}`}
               className="relative block h-[205px] w-full shrink-0 rounded-xl bg-[#f5f8fc]"
            >
               <Image src={detail?.product_color?.cover || noImage} alt="product" className="object-cover p-4" fill />
            </Link>
            <div className="mt-5 space-y-3">
               <p className="h-4 overflow-hidden font-bold [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box]">
                  {detail?.product_color?.product_title}
               </p>
               <div className="flex items-center gap-2 text-sm text-textColor">
                  <p>رنگ انتخاب شده : </p>
                  <div
                     className="size-6 shrink-0 rounded-full"
                     style={{ backgroundColor: detail?.product_color?.product_color }}
                  />
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center gap-2">
                     <IconButton
                        className="!border !border-solid !border-customPink"
                        sx={{ width: '22px', height: '22px' }}
                        onClick={addToBasketHandler}
                        disabled={
                           addToBasketIsMutating ||
                           removeFromBasketIsMutating ||
                           detail?.count === detail?.product_color?.product_stock
                        }
                     >
                        <AddIcon color="customPink" className="!text-base" />
                     </IconButton>

                     <div className="flex flex-col items-center">
                        <p className="text-lg font-bold text-customPinkHigh">
                           {addToBasketIsMutating || removeFromBasketIsMutating ? '...' : detail?.count}
                        </p>
                        {detail?.count === detail?.product_color?.product_stock && (
                           <p className="text-10 text-textColor">حداکثر</p>
                        )}
                     </div>
                     <IconButton
                        className={detail?.count > 1 ? '!border !border-solid !border-textColor' : ''}
                        sx={{ width: '22px', height: '22px' }}
                        onClick={removeFromBasketHandler}
                        disabled={addToBasketIsMutating || removeFromBasketIsMutating}
                     >
                        {detail?.count > 1 ? (
                           <RemoveIcon color="textColor" className="!text-base" />
                        ) : (
                           <DeleteOutlineOutlinedIcon color="textColor" className="!text-xl" />
                        )}
                     </IconButton>
                  </div>

                  <div>
                     <div className="flex h-10 items-center gap-1">
                        {detail?.percentage > 0 && (
                           <>
                              <div className="relative size-6">
                                 <Image src={discountShape} alt="discount" className="size-full" />
                                 <p className="absolute right-[4px] top-[8px] text-[8px] text-white">
                                    {detail?.percentage}%
                                 </p>
                              </div>
                              <p className="text-[11px] text-[#B1B5C4] line-through">
                                 {Number(detail?.before_discount_price).toLocaleString()} تومان
                              </p>
                           </>
                        )}
                     </div>
                     <p className="text-sm text-customPinkHigh">{Number(detail?.total_price).toLocaleString()} تومان</p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default BasketCard;
