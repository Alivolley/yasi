import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// MUI
import { Button, IconButton } from '@mui/material';

// Icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// Assets
import bestSellersPic from '@/assets/images/bestSellersTest.png';

// Components
import ProductCard from '@/components/templates/product-card/product-card';

function BestSellers({ detail }) {
   const productsRef = useRef();

   const scrollToStart = () => {
      productsRef.current.scrollLeft -= 400;
   };

   const scrollToEnd = () => {
      productsRef.current.scrollLeft += 400;
   };

   return (
      <div className="bg-[#F5F8FC] px-2 py-6 customMd:px-16 customMd:py-[70px]">
         <div className="relative flex items-center gap-4 customMd:gap-12">
            <div className="w-[145px] shrink-0 customMd:w-[330px]">
               <p className="text-center text-xl font-bold text-customPinkHigh customMd:text-2xl">
                  پرفروش ترین محصولات
               </p>
               <div className="mt-7 customMd:mb-3">
                  <Image src={bestSellersPic} alt="best sellers" className="size-full" />
               </div>

               <Link href="/categoryDetail?ordering=sales" className="mt-8 hidden customMd:block">
                  <Button
                     color="white"
                     variant="contained"
                     size="large"
                     className="!rounded-10 !py-3 !text-customPinkHigh hover:!bg-[#dccfe9]"
                     fullWidth
                     startIcon={<ShoppingCartIcon />}
                  >
                     نمایش همه
                  </Button>
               </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 overflow-auto scroll-smooth pb-10" ref={productsRef}>
               {detail?.result?.map(item => (
                  <ProductCard key={item.id} detail={item} />
               ))}
            </div>
            <div className="absolute end-[-20px] hidden customMd:block">
               <IconButton
                  sx={{
                     backgroundColor: '#fff',
                     boxShadow: '2px 2px 14px 0px #0000000D',
                     ':hover': { backgroundColor: '#F5F8FC' },
                  }}
                  onClick={scrollToStart}
               >
                  <KeyboardBackspaceIcon />
               </IconButton>
            </div>
            <div className="absolute start-[355px] hidden customMd:block">
               <IconButton
                  sx={{
                     backgroundColor: '#fff',
                     boxShadow: '2px 2px 14px 0px #0000000D',
                     ':hover': { backgroundColor: '#F5F8FC' },
                  }}
                  onClick={scrollToEnd}
               >
                  <KeyboardBackspaceIcon className="rotate-180" />
               </IconButton>
            </div>
         </div>
         <Link href="/categoryDetail?ordering=sales" className="customMd:hidden">
            <Button
               color="white"
               variant="contained"
               size="large"
               className="!rounded-10 !py-3 !text-customPinkHigh hover:!bg-[#dccfe9]"
               fullWidth
               startIcon={<ShoppingCartIcon />}
            >
               نمایش همه
            </Button>
         </Link>
      </div>
   );
}

export default BestSellers;
