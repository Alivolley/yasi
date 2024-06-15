import Image from 'next/image';

// MUI
import { Grid } from '@mui/material';

// Assets
import offPic from '@/assets/images/offs-pic.png';
import offPic2 from '@/assets/images/offs-pic2.png';

function OffersBanner() {
   return (
      <div className="px-8 py-14 customMd:px-16">
         <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
               <div className="size-full customMd:h-[370px]">
                  <Image src={offPic2} alt="off" className="h-[200px] w-full customMd:h-full" />
               </div>
            </Grid>
            <Grid item xs={12} md={6}>
               <div className="size-full customMd:h-[370px]">
                  <Image src={offPic} alt="off" className="h-[200px] w-full customMd:h-full" />
               </div>
            </Grid>
         </Grid>
      </div>
   );
}

export default OffersBanner;
