import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Button } from '@mui/material';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Assets
import categoriesIcon from '@/assets/icons/categories-icon.svg';

// Components
import ProductCard from '@/components/templates/product-card/product-card';

function Newest({ detail }) {
   return (
      <section className="bg-[#FCF7F7] px-8 py-[70px] customMd:px-16">
         <div className="flex items-center justify-between border-b border-solid border-[#E4EAF0] pb-2">
            <div className="flex items-center gap-2">
               <Image src={categoriesIcon} alt="categories" />
               <p className="text-lg font-bold text-textColor">جدیدترین ها</p>
            </div>
            <Link href="/categoryDetail?ordering=created" className="hidden customMd:block">
               <Button endIcon={<KeyboardArrowLeftIcon />} color="textColor">
                  نمایش همه
               </Button>
            </Link>
         </div>

         <div className="mt-10 flex items-center gap-4 overflow-auto pb-8">
            {detail?.result?.map(item => (
               <ProductCard key={item.id} detail={item} />
            ))}
         </div>

         <Link href="/categoryDetail?ordering=created" className="mt-8 block customMd:hidden">
            <Button
               color="white"
               variant="contained"
               size="large"
               className="!rounded-10 !py-4 !text-customPinkHigh hover:!bg-[#dccfe9]"
               fullWidth
               startIcon={<ShoppingCartIcon />}
            >
               نمایش همه
            </Button>
         </Link>
      </section>
   );
}

export default Newest;
