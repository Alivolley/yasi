import { useRouter } from 'next/router';
import Image from 'next/image';

// MUI
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Button,
   Drawer,
   Grid,
   IconButton,
   Slider,
   Switch,
   TextField,
} from '@mui/material';

// Icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Assets
import filterIcon from '@/assets/icons/filter-icon.svg';
import filterIconBold from '@/assets/icons/filterIcon-bold.svg';

// Components
import AppliedFilters from '../applied-filters/applied-filters';
import ColorsFilter from '../colors-filter/colors-filter';

function FilterMobile({
   open,
   onClose,
   priceRange,
   setPriceRange,
   showAvailableProducts,
   setShowAvailableProducts,
   showDiscountProducts,
   setShowDiscountProducts,
   chosenCategories,
   toggleCategory,
   categoryList,
   productsList,
   applyFilterHandler,
   chosenColor,
   setChosenColor,
}) {
   const { push } = useRouter();

   const changePriceRange = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
         return;
      }

      if (newValue[1] - newValue[0] < 1) {
         if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - 1);
            setPriceRange([clamped, clamped + 1]);
         } else {
            const clamped = Math.max(newValue[1], 1);
            setPriceRange([clamped - 1, clamped]);
         }
      } else {
         setPriceRange(newValue);
      }
   };

   return (
      <Drawer anchor="bottom" open={open} onClose={onClose} transitionDuration={500}>
         <div className="max-h-[500px] bg-white p-5">
            <div className="flex items-start justify-between">
               <div>
                  <p className="flex items-center gap-1 text-base font-bold text-customBlue">
                     <Image src={filterIcon} alt="filter" />
                     فیلتر محصولات
                  </p>
                  <p className="mt-1 text-xs text-textColor">برای ثبت فیلتر ها دکمه های اعمال فیلتر را بزنید</p>
               </div>
               <IconButton onClick={onClose}>
                  <CloseIcon />
               </IconButton>
            </div>

            <div className="mb-3 mt-8 flex items-center justify-between border-b border-solid border-[#E4EAF0] pb-2">
               <p>فیلتر های اعمال شده:</p>
               <Button
                  color="customPinkHigh"
                  size="small"
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  onClick={() => {
                     push('/categoryDetail');
                     onClose();
                  }}
               >
                  حذف همه فیلتر ها
               </Button>
            </div>

            <AppliedFilters />

            <div className="mt-10">
               <Accordion sx={{ boxShadow: 'none' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: '0 !important' }}>
                     دسته بندی ها
                  </AccordionSummary>
                  <AccordionDetails>
                     <div className="-mt-3">
                        <Grid container>
                           {categoryList?.map(
                              item =>
                                 !chosenCategories.some(cat => cat === item.title) && (
                                    <Grid item key={item.id} xs={6}>
                                       <Button
                                          color="textColor"
                                          size="small"
                                          onClick={() => toggleCategory(item.title)}
                                       >
                                          {item?.title}
                                       </Button>
                                    </Grid>
                                 )
                           )}
                        </Grid>
                     </div>
                  </AccordionDetails>
               </Accordion>
               <div className="mt-3 flex flex-wrap gap-3">
                  {chosenCategories?.map(item => (
                     <Button
                        key={item}
                        color="customPinkLow"
                        size="small"
                        variant="contained"
                        className="!text-xs !text-[#B1302E]"
                        endIcon={<CloseIcon />}
                        onClick={() => toggleCategory(item)}
                     >
                        {item}
                     </Button>
                  ))}
               </div>
            </div>

            <ColorsFilter chosenColor={chosenColor} setChosenColor={setChosenColor} />

            <div className="mt-6 border-t border-solid border-[#E4EAF0] pt-6">
               <p>محدوده قیمت ( تومان )</p>
               <div className="my-5 flex items-center gap-4">
                  <p>از</p>
                  <TextField
                     variant="outlined"
                     color="customPink"
                     type="number"
                     size="small"
                     value={priceRange[0]}
                     onChange={e => setPriceRange(prev => [Number(e.target.value), prev[1]])}
                  />
                  <p>تا</p>
                  <TextField
                     variant="outlined"
                     color="customPink"
                     type="number"
                     size="small"
                     value={priceRange[1]}
                     onChange={e => setPriceRange(prev => [prev[0], Number(e.target.value)])}
                  />
               </div>
            </div>
            <div className="border-b border-solid border-[#E4EAF0] px-3 pb-6">
               <Slider
                  color="customPinkHigh"
                  valueLabelDisplay="auto"
                  min={0}
                  max={128000}
                  value={priceRange}
                  onChange={changePriceRange}
                  valueLabelFormat={value => `${value.toLocaleString()} تومان`}
               />
               <div className="flex items-center justify-between text-sm text-textColor">
                  <p>ارزان ترین</p>
                  <p>گران ترین</p>
               </div>
            </div>
            <div className="text-customBlue">
               <div className="mt-3 flex items-center justify-between">
                  <p>تخفیف دار</p>
                  <Switch
                     color="customBlue"
                     value={showDiscountProducts}
                     onChange={(e, newValue) => setShowDiscountProducts(newValue)}
                     checked={showDiscountProducts}
                  />
               </div>
               <div className="mt-3 flex items-center justify-between border-t border-solid border-[#E4EAF0] pt-3">
                  <p>نمایش محصولات موجود</p>
                  <Switch
                     color="customBlue"
                     value={showAvailableProducts}
                     onChange={(e, newValue) => setShowAvailableProducts(newValue)}
                     checked={showAvailableProducts}
                  />
               </div>
               <div className="mt-3 flex items-center justify-between border-t border-solid border-[#E4EAF0] pt-5">
                  <p className="flex items-center gap-2 text-sm">
                     <WidgetsOutlinedIcon fontSize="small" /> نتیجه فیلتر ها:
                  </p>
                  <p className="flex items-center gap-1 text-sm text-customPinkHigh">
                     {productsList?.total_objects} محصول
                     <PlayArrowOutlinedIcon fontSize="small" className="rotate-[270deg]" />
                  </p>
               </div>
            </div>

            <div className="mt-10 pb-10">
               <Button
                  variant="contained"
                  color="customPink2"
                  className="!rounded-10 !py-3 !text-[#B1302E]"
                  fullWidth
                  onClick={applyFilterHandler}
               >
                  <div className="flex w-full items-center justify-between px-2">
                     <Image src={filterIconBold} alt="filter" />
                     اعمال فیلتر
                  </div>
               </Button>
            </div>
         </div>
      </Drawer>
   );
}

export default FilterMobile;
