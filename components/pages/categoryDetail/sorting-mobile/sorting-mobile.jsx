import { useRouter } from 'next/router';

// MUI
import { Button, Drawer, IconButton } from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';

function SortingMobile({ open, onClose, setSortingValue }) {
   const { query, push } = useRouter();

   const changeSortHandler = newValue => {
      setSortingValue(newValue);

      push({
         query: {
            ...query,
            ordering: newValue,
         },
      });
      onClose();
   };

   return (
      <Drawer anchor="bottom" open={open} onClose={onClose} transitionDuration={500}>
         <div className="max-h-[500px] bg-white p-5">
            <div className="flex items-center justify-between">
               <div>
                  <p className="text-base font-bold text-customBlue">فیلتر بر اساس</p>
               </div>
               <IconButton onClick={onClose}>
                  <CloseIcon />
               </IconButton>
            </div>
            <div className="mt-8 flex flex-col items-start gap-3">
               <Button color="textColor" onClick={() => changeSortHandler('')}>
                  همه
               </Button>
               <Button color="textColor" onClick={() => changeSortHandler('created')}>
                  جدید ترین ها
               </Button>
               <Button color="textColor" onClick={() => changeSortHandler('rial_price')}>
                  ارزان ترین
               </Button>
               <Button color="textColor" onClick={() => changeSortHandler('-rial_price')}>
                  گران ترین
               </Button>
               <Button color="textColor" onClick={() => changeSortHandler('sales')}>
                  پر فروش ترین
               </Button>
            </div>
         </div>
      </Drawer>
   );
}

export default SortingMobile;
