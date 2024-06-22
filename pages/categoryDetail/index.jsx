import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';

// MUI
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Button,
   Grid,
   Pagination,
   Slider,
   Switch,
   Tab,
   Tabs,
   TextField,
} from '@mui/material';

// Icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

// Config
import axiosInstance from '@/configs/axiosInstance';

// Assets
import filterIcon from '@/assets/icons/filter-icon.svg';

// Components
import ProductCard from '@/components/templates/product-card/product-card';
import FilterMobile from '@/components/pages/categoryDetail/filter-mobile/filter-mobile';
import SortingMobile from '@/components/pages/categoryDetail/sorting-mobile/sorting-mobile';
import AppliedFilters from '@/components/pages/categoryDetail/applied-filters/applied-filters';
import ColorsFilter from '@/components/pages/categoryDetail/colors-filter/colors-filter';

function CategoryDetail({ error, productsList, mostExpensivePrice, categoryList }) {
   const { query, push } = useRouter();
   const [priceRange, setPriceRange] = useState([0, mostExpensivePrice]);
   const [showAvailableProducts, setShowAvailableProducts] = useState(false);
   const [showDiscountProducts, setShowDiscountProducts] = useState(false);
   const [sortingValue, setSortingValue] = useState('');
   const [chosenCategories, setChosenCategories] = useState([]);
   const [chosenColor, setChosenColor] = useState('');
   const [showFilterMobile, setShowFilterMobile] = useState(false);
   const [showSortingMobile, setShowSortingMobile] = useState(false);

   useEffect(() => {
      setPriceRange(query?.price ? query?.price?.split('-').map(item => Number(item)) : [0, mostExpensivePrice]);
      setShowAvailableProducts(Boolean(query?.available) || false);
      setShowDiscountProducts(Boolean(query?.has_discount) || false);
      setSortingValue(query?.ordering || '');
      setChosenColor(query?.color || '');
      setChosenCategories(query?.category?.split('|') || []);
   }, [query]);

   useEffect(() => {
      if (error) {
         toast.error(error);
      }
   }, [error]);

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

   const filters = `${
      priceRange[0] !== 0 || priceRange[1] !== mostExpensivePrice ? `price=${priceRange[0]}-${priceRange[1]}&` : ''
   }${showAvailableProducts ? 'available=true&' : ''}${showDiscountProducts ? 'has_discount=true&' : ''}${
      chosenCategories.length ? `category=${chosenCategories.join('|')}&` : ''
   }${chosenColor ? `color=${chosenColor}&` : ''}`;

   const applyFilterHandler = () => {
      push(`/categoryDetail?ordering=${sortingValue}&${filters}`);
      setShowFilterMobile(false);
   };

   const changePageHandler = (e, newValue) => {
      push({
         query: {
            ...query,
            page: newValue,
         },
      });
   };

   const toggleCategory = title => {
      const isSelected = chosenCategories.some(item => item === title);

      if (isSelected) {
         setChosenCategories(prev => prev.filter(item => item !== title));
      } else {
         setChosenCategories(prev => [...prev, title]);
      }
   };

   const changeTabHandler = (e, newValue) => {
      setSortingValue(newValue);

      push({
         query: {
            ...query,
            ordering: newValue,
         },
      });
   };

   return (
      <div className="bg-[#f6f2f3] px-3 py-8 customMd:px-16 customLg:py-16">
         <Head>
            <title>یاسی هوم - دسته بندی ها</title>
         </Head>
         <div className="flex gap-8">
            <div className="hidden h-fit w-[370px] shrink-0 rounded-2xl bg-white p-5 customLg:block">
               <div>
                  <p className="flex items-center gap-1 text-base font-bold text-customBlue">
                     <Image src={filterIcon} alt="filter" />
                     فیلتر محصولات
                  </p>
                  <p className="mt-1 text-xs text-textColor">برای ثبت فیلتر ها دکمه های اعمال فیلتر را بزنید</p>
               </div>

               <div className="mb-3 mt-8 flex items-center justify-between border-b border-solid border-[#E4EAF0] pb-2">
                  <p>فیلتر های اعمال شده:</p>
                  <Button
                     color="customPinkHigh"
                     size="small"
                     startIcon={<DeleteOutlineOutlinedIcon />}
                     onClick={() => push('/categoryDetail')}
                  >
                     حذف همه ی فیلتر ها
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
                           className="!text-xs"
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
                     max={mostExpensivePrice}
                     value={priceRange}
                     onChange={changePriceRange}
                     valueLabelFormat={value => `${value.toLocaleString()} تومان`}
                  />
                  <div className="flex items-center justify-between text-sm text-textColor">
                     <p>ارزان ترین</p>
                     <p>گرانترین</p>
                  </div>
               </div>
               <div className="text-customBlue">
                  <div className="mt-3 flex items-center justify-between">
                     <p>تخفیف دار</p>
                     <Switch
                        color="secondary"
                        value={showDiscountProducts}
                        onChange={(e, newValue) => setShowDiscountProducts(newValue)}
                        checked={showDiscountProducts}
                     />
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-solid border-[#E4EAF0] pt-3">
                     <p>نمایش محصولات موجود</p>
                     <Switch
                        color="secondary"
                        value={showAvailableProducts}
                        onChange={(e, newValue) => setShowAvailableProducts(newValue)}
                        checked={showAvailableProducts}
                     />
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-solid border-[#E4EAF0] pt-5">
                     <p className="flex items-center gap-2 text-sm">
                        <WidgetsOutlinedIcon fontSize="small" /> نتیجه ی فیلتر ها:
                     </p>
                     <p className="flex items-center gap-1 text-sm text-customPinkHigh">
                        {productsList?.total_objects} محصول
                        <PlayArrowOutlinedIcon fontSize="small" className="rotate-[270deg]" />
                     </p>
                  </div>
               </div>

               <div className="mt-10">
                  <Button
                     variant="contained"
                     color="customPink2"
                     className="!rounded-10 !py-3"
                     fullWidth
                     onClick={applyFilterHandler}
                  >
                     <div className="flex w-full items-center justify-between px-2">
                        <FilterAltOutlinedIcon className="!size-8" />
                        اعمال فیلتر
                     </div>
                  </Button>
               </div>
            </div>

            <div className="grow">
               <div className="hidden items-center justify-between rounded-2xl bg-white px-5 py-1 customLg:flex">
                  <p className="flex items-center gap-1">
                     <FilterListIcon color="customPinkHigh" />
                     مرتب سازی:
                  </p>

                  <div>
                     <Tabs
                        value={sortingValue}
                        onChange={changeTabHandler}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                     >
                        <Tab label="همه" value="" className="!normal-case" />
                        <Tab label="جدیدترین" value="created" className="!normal-case" />
                        <Tab label="ارزان ترین" value="rial_price" className="!normal-case" />
                        <Tab label="گران ترین" value="-rial_price" className="!normal-case" />
                        <Tab label="پرفروش ترین" value="sales" className="!normal-case" />
                     </Tabs>
                  </div>
                  <p>تعداد کالاها : {productsList?.total_objects}</p>
               </div>
               <div className="flex flex-wrap items-center justify-between rounded-2xl bg-white px-5 py-3 customLg:hidden">
                  <Button
                     startIcon={<Image src={filterIcon} alt="filter" />}
                     className="!text-xs !font-bold customSm:!text-sm"
                     color="black"
                     onClick={() => setShowFilterMobile(true)}
                  >
                     فیلتر محصولات
                  </Button>

                  <Button
                     startIcon={<FilterListIcon color="customPinkHigh" fontSize="small" />}
                     className="!text-xs !font-bold customSm:!text-sm"
                     color="black"
                     onClick={() => setShowSortingMobile(true)}
                  >
                     {sortingValue === 'created'
                        ? 'جدیدترین'
                        : sortingValue === `rial_price`
                          ? 'ارزان ترین'
                          : sortingValue === `-rial_price`
                            ? 'گران ترین'
                            : sortingValue === 'sales'
                              ? 'پرفروش ترین'
                              : 'همه'}
                  </Button>
               </div>

               <FilterMobile
                  open={showFilterMobile}
                  onClose={() => setShowFilterMobile(false)}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  showAvailableProducts={showAvailableProducts}
                  setShowAvailableProducts={setShowAvailableProducts}
                  showDiscountProducts={showDiscountProducts}
                  setShowDiscountProducts={setShowDiscountProducts}
                  chosenCategories={chosenCategories}
                  toggleCategory={toggleCategory}
                  categoryList={categoryList}
                  productsList={productsList}
                  applyFilterHandler={applyFilterHandler}
                  chosenColor={chosenColor}
                  setChosenColor={setChosenColor}
               />

               <SortingMobile
                  open={showSortingMobile}
                  onClose={() => setShowSortingMobile(false)}
                  setSortingValue={setSortingValue}
               />

               <div className="mt-6">
                  {productsList?.result?.length ? (
                     <div className="flex flex-wrap justify-center gap-4 customMd:gap-8">
                        {productsList?.result?.map(item => (
                           <ProductCard key={item.id} detail={item} />
                        ))}
                     </div>
                  ) : (
                     <p className="mt-14 text-center">محصولی با این فیلتر ها وجود ندارد</p>
                  )}
               </div>

               {productsList?.result?.length ? (
                  <div className="mt-10 flex items-center justify-center">
                     <Pagination
                        count={productsList?.total_pages}
                        color="customPinkHigh"
                        onChange={changePageHandler}
                        page={Number(query?.page) || 1}
                        sx={{ '& .Mui-selected': { color: 'white !important' } }}
                     />
                  </div>
               ) : null}
            </div>
         </div>
      </div>
   );
}

export default CategoryDetail;

export async function getServerSideProps(context) {
   const { query } = context;

   try {
      const categoryList = await axiosInstance(`store/categories/list_create/`).then(res => res.data);

      let queryString = `store/products/list_create/?highest_price=true`;

      if (query?.available) {
         queryString += '&available=true';
      }
      if (query?.has_discount) {
         queryString += '&has_discount=true';
      }
      if (query?.price) {
         queryString += `&price=${query.price}`;
      }
      if (query?.category) {
         queryString += `&category=${query.category}`;
      }
      if (query?.ordering) {
         queryString += `&ordering=${query.ordering}`;
      }
      if (query?.color) {
         queryString += `&color=${query.color}`;
      }
      if (query?.page) {
         queryString += `&page=${query.page}`;
      }

      const productsList = await axiosInstance(queryString).then(res => res.data);

      return {
         props: {
            productsList,
            categoryList,
            mostExpensivePrice: productsList.highest_price,
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
