import { useState } from 'react';
import Link from 'next/link';

// MUI
import { CircularProgress, Grid } from '@mui/material';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

// Apis
import useCategories from '@/apis/categories/useCategories';
import useGetProductsCategory from '@/apis/categories/useGetProductsCategory';

function HeaderCategories() {
   const [activeCategory, setActiveCategory] = useState();

   const { data: productsCategoryList, isLoading: productsCategoryIsLoading } = useGetProductsCategory(
      activeCategory?.title
   );
   const { data: categoryList } = useCategories();

   return (
      <div className="flex">
         <div className="flex h-full max-h-[350px] flex-1 flex-col overflow-auto border-e border-solid border-[#E4EAF0] pe-5">
            {categoryList?.map(item => (
               <Link
                  href={`/categoryDetail?category=${item?.title}`}
                  className="flex items-center justify-between gap-2 rounded-10 px-3 py-5 transition-all duration-150 hover:bg-[#F5F8FC] hover:text-[#FF817E]"
                  id="arrowIcon"
                  key={item.id}
                  onMouseEnter={() => setActiveCategory(item)}
               >
                  {item?.title}
                  {item === activeCategory && <KeyboardArrowLeftIcon fontSize="small" />}
               </Link>
            ))}
         </div>
         <div className="max-h-[350px] flex-1 overflow-auto ps-5">
            <Grid container>
               {productsCategoryIsLoading ? (
                  <div className="mt-6 flex w-full items-center justify-center">
                     <CircularProgress color="customPink" />
                  </div>
               ) : (
                  productsCategoryList?.result?.map(item => (
                     <Grid item xs={6} key={item.id}>
                        <Link
                           href={`/productDetail/${item?.title}`}
                           className="block border-s-2 border-solid border-transparent py-3 ps-1 text-sm transition-all
                            duration-200 hover:border-[#FF817E] hover:text-[#FF817E]"
                        >
                           {item?.title}
                        </Link>
                     </Grid>
                  ))
               )}
            </Grid>
         </div>
      </div>
   );
}

export default HeaderCategories;
