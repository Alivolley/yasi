import Head from 'next/head';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// MUI
import { Button, Pagination } from '@mui/material';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Configs
import axiosInstance from '@/configs/axiosInstance';

// Assets
import noResult from '@/assets/images/search-not-found.png';
import categoriesIcon from '@/assets/icons/categories-icon.svg';

// components
import ProductCard from '@/components/templates/product-card/product-card';

function Search({ searchResultList, error, suggestsList }) {
   const { push, query } = useRouter();
   const productNameQuery = query.productName;

   useEffect(() => {
      if (error) {
         toast.error(error);
      }
   }, [error]);

   const changePageHandler = (e, newValue) => {
      push(`/search?productName=${productNameQuery}&page=${newValue}`);
   };

   return (
      <>
         <Head>
            <title>یاسی - {productNameQuery}</title>
         </Head>
         <div className="bg-[#f6f2f3] p-8 customMd:px-16 customLg:pb-6 customLg:pt-16">
            <p className="text-center text-2xl font-bold">
               نتایج جستجو برای : <span className="text-customPinkHigh">{productNameQuery}</span>
            </p>

            <div className="mt-14 flex flex-wrap justify-center gap-5">
               {searchResultList?.total_objects === 0 ? (
                  <div>
                     <p className="mb-10 text-center font-bold">محصول مورد نظر یافت نشد</p>
                     <div className="mt-4 w-[250px]">
                        <Image alt="no result" src={noResult} className="size-full" priority />
                     </div>
                  </div>
               ) : (
                  searchResultList?.result?.map(item => <ProductCard key={item.id} detail={item} />)
               )}
            </div>
            {searchResultList?.total_objects !== 0 && (
               <div className="flex items-center justify-center py-16">
                  <Pagination
                     count={searchResultList?.total_pages}
                     color="customPinkHigh"
                     page={Number(query?.page)}
                     onChange={changePageHandler}
                     sx={{
                        '& .Mui-selected': { color: 'white !important' },
                     }}
                  />
               </div>
            )}
         </div>
         <section className="bg-[#FCF7F7] px-8 py-[70px] customMd:px-16">
            <div className="flex items-center justify-between border-b border-solid border-[#E4EAF0] pb-2">
               <div className="flex items-center gap-2">
                  <Image src={categoriesIcon} alt="categories" />
                  <p className="text-lg font-bold text-textColor">پیشنهادات ما</p>
               </div>
               <Link href="/categoryDetail" className="hidden customMd:block">
                  <Button endIcon={<KeyboardArrowLeftIcon />} color="textColor">
                     نمایش همه
                  </Button>
               </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 overflow-auto pb-5">
               {suggestsList?.result?.map(item => (
                  <ProductCard key={item.id} detail={item} />
               ))}
            </div>

            <Link href="/categoryDetail" className="mt-8 block customMd:hidden">
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
      </>
   );
}

export default Search;

export async function getServerSideProps(context) {
   const { query, req } = context;
   const accessToken = req?.cookies?.yasi_accessToken;

   try {
      const searchResultList = await axiosInstance(
         `store/products/list_create/?search=${query?.productName}&page=${query?.page}`,
         {
            ...(accessToken && {
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            }),
         }
      ).then(res => res.data);

      const suggestsList = await axiosInstance(`store/products/list_create/?suggest=true`).then(res => res.data);

      return {
         props: {
            searchResultList,
            suggestsList,
         },
      };
   } catch (error) {
      return {
         props: {
            error: error?.message,
         },
      };
   }
}
