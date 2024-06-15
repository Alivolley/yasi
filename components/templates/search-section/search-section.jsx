import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CircularProgress, IconButton } from '@mui/material';

// Icons
import HistoryIcon from '@mui/icons-material/History';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// Assets
import starIcon from '@/assets/icons/top-search.svg';

// Components
import ProductCard from '../product-card/product-card';
import useOnClickOutside from '@/hooks/useOnclickOutside';

// Apis
import useSearchHistory from '@/apis/userInfo/useSearchHistory';
import useSuggestion from '@/apis/categories/useSuggestion';

function SearchSection({ onClose, isUserLogin }) {
   const productsRef = useRef();
   const { data: searchHistoryData } = useSearchHistory();
   const { data: suggestionsData, isLoading: suggestionsIsLoading } = useSuggestion();

   const [sectionRef] = useOnClickOutside(onClose);

   const scrollToStart = () => {
      productsRef.current.scrollLeft -= 300;
   };

   const scrollToEnd = () => {
      productsRef.current.scrollLeft += 300;
   };

   return (
      <div ref={sectionRef}>
         {isUserLogin && searchHistoryData?.user_searches?.length ? (
            <div className="mb-4 border-b border-solid border-[#E4EAF0] pb-4">
               <p className="flex items-center gap-2 text-sm">
                  <HistoryIcon color="customPinkHigh" />
                  آخرین جستجو های شما
               </p>
               <div className="mt-6 flex items-center gap-4">
                  {searchHistoryData?.user_searches?.map(item => (
                     <Link
                        href={`/search?productName=${item.word}&page=1`}
                        className="rounded-2xl bg-[#F5F8FC] px-4 py-2 text-sm text-textColor"
                        key={item.word}
                        onClick={onClose}
                     >
                        {item.word}
                     </Link>
                  ))}
               </div>
            </div>
         ) : null}

         <div>
            <p className="flex items-center gap-2 text-sm">
               <Image src={starIcon} alt="favorite" />
               جستجو های پر طرفدار
            </p>
            <div className="mt-4 flex items-center gap-4">
               {searchHistoryData?.popular_searches?.map(item => (
                  <Link
                     href={`/search?productName=${item.word}&page=1`}
                     className="rounded-2xl bg-[#F5F8FC] px-4 py-2 text-sm text-textColor"
                     key={item.word}
                     onClick={onClose}
                  >
                     {item.word}
                  </Link>
               ))}
            </div>
         </div>

         {suggestionsIsLoading ? (
            <div className="my-12 flex w-full items-center justify-center">
               <CircularProgress color="customPink" />
            </div>
         ) : (
            <div className="relative flex items-center gap-4 customMd:gap-12">
               <div className="mt-5 flex items-center gap-4 overflow-auto scroll-smooth pb-5" ref={productsRef}>
                  {suggestionsData?.result?.map(item => (
                     <ProductCard key={item.id} detail={item} />
                  ))}
               </div>
               <div className="absolute end-[-10px] hidden customMd:block">
                  <IconButton
                     sx={{
                        backgroundColor: '#000B2C',
                        boxShadow: '2px 2px 14px 0px #0000000D',
                        ':hover': { backgroundColor: '#000b2cb5' },
                     }}
                     onClick={scrollToStart}
                  >
                     <KeyboardBackspaceIcon color="white" />
                  </IconButton>
               </div>
               <div className="absolute start-[-10px] hidden customMd:block">
                  <IconButton
                     sx={{
                        backgroundColor: '#000B2C',
                        boxShadow: '2px 2px 14px 0px #0000000D',
                        ':hover': { backgroundColor: '#000b2cb5' },
                     }}
                     onClick={scrollToEnd}
                  >
                     <KeyboardBackspaceIcon className="rotate-180" color="white" />
                  </IconButton>
               </div>
            </div>
         )}
      </div>
   );
}

export default SearchSection;
