import { useRouter } from 'next/router';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// MUI
import { Button } from '@mui/material';

function AppliedFilters() {
   const { query, push } = useRouter();

   const removeFilter = propName => {
      delete query[propName];
      const newQuery = { ...query };
      push({
         query: {
            ...newQuery,
         },
      });
   };

   return (
      <div className="flex flex-wrap gap-3">
         {query?.ordering && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('ordering')}
            >
               مرتب سازی
            </Button>
         )}
         {query?.category && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('category')}
            >
               دسته بندی ها
            </Button>
         )}
         {query?.price && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('price')}
            >
               محدوده قیمت
            </Button>
         )}
         {query?.available && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('available')}
            >
               محصولات موجود
            </Button>
         )}
         {query?.has_discount && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('has_discount')}
            >
               تخفیف دار
            </Button>
         )}
         {query?.color && (
            <Button
               color="customPinkLow"
               size="small"
               variant="contained"
               className="!text-xs"
               endIcon={<CloseIcon />}
               onClick={() => removeFilter('color')}
            >
               رنگ
            </Button>
         )}
      </div>
   );
}

export default AppliedFilters;
