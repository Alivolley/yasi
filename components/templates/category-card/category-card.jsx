import Image from 'next/image';

// MUI
import { Button } from '@mui/material';

// Icons
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// Assets
import CategoryCardStyle from './category-card.style';
import noImage from '@/assets/images/noImage.png';
import Cube from '@/assets/icons/3d-cube';

function CategoryCard({ detail }) {
   return (
      <CategoryCardStyle
         href={`/categoryDetail?category=${detail?.title}`}
         className="w-[162px] shrink-0 rounded-2xl bg-white p-2.5 customMd:w-[236px] customMd:p-5"
      >
         <Cube />
         <div
            className="relative mb-5 flex aspect-square items-center justify-center rounded-xl bg-[#F5F8FC]"
            id="categoryImage"
         >
            <Image
               src={detail?.cover || noImage}
               alt={detail?.title}
               className="rounded-xl object-contain object-center"
               fill
            />
         </div>

         <Button
            fullWidth
            color="customBlue"
            startIcon={
               <svg className="size-6">
                  <use href="#cube" />
               </svg>
            }
            endIcon={<KeyboardBackspaceIcon className="max-customMd:!text-base" />}
            className="max-customMd:!px-0 max-customMd:!text-xs"
            sx={{
               span: {
                  marginX: '2px !important',
               },
            }}
         >
            {detail?.title}
         </Button>
      </CategoryCardStyle>
   );
}

export default CategoryCard;
