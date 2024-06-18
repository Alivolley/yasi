import Image from 'next/image';
import Link from 'next/link';

// MUI
import { Grid } from '@mui/material';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function BoldProducts({ detail }) {
   return (
      <div className="px-8 py-[70px] customMd:px-16">
         <Grid container spacing={4}>
            {detail?.result?.map(item => (
               <Grid item xs={12} md={4} key={item?.id}>
                  <Link
                     href={`/productDetail/${item?.title}`}
                     className="flex flex-col rounded-2xl border border-solid border-[#E4EAF0] hover:[&>#text]:text-customPinkHigh"
                  >
                     <div className="relative aspect-[10/7] size-full customMd:aspect-[10/8]">
                        <Image src={item?.cover} alt="bold product" className="rounded-t-2xl" fill />
                     </div>

                     <p className="flex items-center gap-2 px-7 py-4 transition-all duration-200" id="text">
                        {item?.title} <KeyboardArrowLeftIcon />
                     </p>
                  </Link>
               </Grid>
            ))}
         </Grid>
      </div>
   );
}

export default BoldProducts;
