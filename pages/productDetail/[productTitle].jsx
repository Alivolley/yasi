import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Redux
import { useSelector } from 'react-redux';

// MUI
import {
   Button,
   Fab,
   Grid,
   IconButton,
   // CircularProgress,
   //   Rating
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
// import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SubjectIcon from '@mui/icons-material/Subject';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

// Assets
import categoriesIcon from '@/assets/icons/categories-icon.svg';

// Components
// import Comment from '@/components/pages/productDetail/comment/comment';
// import AddComment from '@/components/pages/productDetail/add-comment/add-comment';
import ProductCard from '@/components/templates/product-card/product-card';

// Configs
import axiosInstance from '@/configs/axiosInstance';

// Apis
import useGetFavorites from '@/apis/favorites/useGetFavorites';
import useToggleFavorites from '@/apis/favorites/useToggleFavorites';
// import useGetComments from '@/apis/comments/useGetComments';
import useAddToBasket from '@/apis/basket/useAddToBasket';
import useRemoveFromBasket from '@/apis/basket/useRemoveFromBasket';
import useGetBasket from '@/apis/basket/useGetBasket';

function ProductDetail({ error, productDetail, categoryItems }) {
   const [chosenColor, setChosenColor] = useState(productDetail?.colors?.find(item => item.stock > 0) || '');
   const [chosenPicture, setChosenPicture] = useState(productDetail?.images?.[0] || '');

   const isLogin = useSelector(state => state?.loginStatusReducer);

   const { trigger: toggleFavoriteTrigger, isMutating: toggleFavoriteIsMutating } = useToggleFavorites();
   const { data: favoritesData } = useGetFavorites(isLogin);
   // const {
   //    mutate: commentsMutate,
   //    data: commentsData,
   //    isLoading: commentsIsLoading,
   //    size: commentsSize,
   //    setSize: commentsSetSize,
   //    isValidating: commentsIsValidating,
   // } = useGetComments(productDetail?.id);

   const { isMutating: addToBasketIsMutating, trigger: addToBasketTrigger } = useAddToBasket();
   const { isMutating: removeFromBasketIsMutating, trigger: removeFromBasketTrigger } = useRemoveFromBasket();
   const { data: basketData } = useGetBasket(isLogin);

   const isLiked = favoritesData?.find(item => item?.id === productDetail?.id);
   const isInCart = basketData?.orders?.find(item => item?.product_color_id === chosenColor?.id);
   const chosenColorStock = productDetail?.colors?.find(item => item?.id === chosenColor?.id)?.stock;

   useEffect(() => {
      if (error) {
         toast.error(error);
      }
   }, [error]);

   const toggleLike = () => {
      if (isLogin) {
         toggleFavoriteTrigger(productDetail?.id);
      } else {
         toast.info('برای افزودن به علاقه مندی ها ، ابتدا وارد حساب کاربری خود شوید');
      }
   };

   const addToBasketHandler = () => {
      if (isLogin) {
         const productObj = {
            product_color_id: chosenColor?.id,
            product_count: isInCart ? Number(isInCart?.count) + 1 : 1,
         };

         addToBasketTrigger(productObj);
      } else {
         toast.info('برای افزودن به سبد خرید ، ابتدا وارد حساب کاربری خود شوید');
      }
   };

   const removeFromBasketHandler = () => {
      const productObj = {
         product_color_id: chosenColor?.id,
         product_count: Number(isInCart?.count) - 1,
      };

      removeFromBasketTrigger(productObj);
   };

   return (
      <div className="bg-[#fcf7f7] px-8 py-[60px] customMd:px-16">
         <Head>
            <title>یاسی هوم - {productDetail?.title}</title>
         </Head>
         <Grid container columnSpacing={4}>
            <Grid item xs={12} md={6}>
               <div className="mb-8 customMd:hidden">
                  <div className="flex items-start justify-between gap-1">
                     <p className="text-lg font-bold customMd:text-2xl">{productDetail?.title}</p>
                     <LoadingButton
                        className="!h-[25px] !w-[25px] !min-w-0 !shrink-0 !p-0 customMd:!h-[30px] customMd:!w-[30px]"
                        variant="contained"
                        color="customPinkLow"
                        onClick={toggleLike}
                        loading={toggleFavoriteIsMutating}
                     >
                        {isLiked ? (
                           <FavoriteIcon color="customPinkHigh" />
                        ) : (
                           <FavoriteBorderIcon color="customPinkHigh" />
                        )}
                     </LoadingButton>
                  </div>

                  {/* <div className="mt-5 flex flex-wrap items-center gap-5 text-xs customMd:flex-nowrap">
                     <p>
                        <Rating
                           precision={0.1}
                           value={productDetail?.average_score}
                           readOnly
                           size="small"
                           sx={{ color: '#FF9F1C' }}
                        />
                     </p>
                     <div className="flex items-center gap-1 text-10">
                        <p>{productDetail?.average_score}</p>
                        <p className="text-textColor">
                           ( از {commentsData?.[Number(commentsData?.length) - 1]?.total_objects} نظر )
                        </p>
                     </div>
                     <p className="flex items-center gap-1 text-textColor">
                        <QuestionAnswerOutlinedIcon color="customPink" fontSize="small" />{' '}
                        {commentsData?.[Number(commentsData?.length) - 1]?.total_objects} دیدگاه
                     </p>
                  </div> */}
               </div>
               <div className="relative h-[250px] w-full customSm:h-[500px]">
                  <Image src={chosenPicture?.image} alt="product" className="rounded-2xl object-cover" fill />
               </div>

               <div className="mt-3">
                  <Grid container spacing={1}>
                     {productDetail?.images?.map(item => (
                        <Grid item xs={2} xl={1} key={item?.id}>
                           <button
                              type="button"
                              className={`relative h-[40px] w-full rounded-[4px] border-none bg-none outline-none customSm:h-[80px] customMd:h-[60px] ${
                                 item?.id === chosenPicture?.id ? '!border-2 !border-solid !border-customBlue' : ''
                              }`}
                              onClick={() => setChosenPicture(item)}
                           >
                              <Image
                                 src={item?.image}
                                 alt="product"
                                 className="cursor-pointer rounded-[4px] object-cover p-0.5"
                                 fill
                              />
                           </button>
                        </Grid>
                     ))}
                  </Grid>
               </div>
            </Grid>

            <Grid item xs={12} md={6}>
               <div className="mt-10 customMd:mt-0">
                  <div className="hidden items-start justify-between gap-1 customMd:flex">
                     <p className="text-lg font-bold customMd:text-2xl">{productDetail?.title}</p>
                     <LoadingButton
                        className="!h-[25px] !w-[25px] !min-w-0 !shrink-0 !p-0 customMd:!h-[30px] customMd:!w-[30px]"
                        variant="contained"
                        color="customPinkLow"
                        onClick={toggleLike}
                        loading={toggleFavoriteIsMutating}
                     >
                        {isLiked ? (
                           <FavoriteIcon color="customPinkHigh" />
                        ) : (
                           <FavoriteBorderIcon color="customPinkHigh" />
                        )}
                     </LoadingButton>
                  </div>

                  {/* <div className="mt-5 hidden flex-wrap items-center gap-5 text-xs customMd:flex customMd:flex-nowrap">
                     <p>
                        <Rating
                           precision={0.1}
                           value={productDetail?.average_score}
                           readOnly
                           size="small"
                           sx={{ color: '#FF9F1C' }}
                        />
                     </p>
                     <div className="flex items-center gap-1 text-10">
                        <p>{productDetail?.average_score}</p>
                        <p className="text-textColor">
                           ( از {commentsData?.[Number(commentsData?.length) - 1]?.total_objects} نظر )
                        </p>
                     </div>
                     <p className="flex items-center gap-1 text-textColor">
                        <QuestionAnswerOutlinedIcon color="customPink" fontSize="small" />{' '}
                        {commentsData?.[Number(commentsData?.length) - 1]?.total_objects} دیدگاه
                     </p>
                  </div> */}

                  {!productDetail?.colors && (
                     <p className="mt-16 rounded-10 bg-customPink2 p-5 text-center">محصول موجود نیست</p>
                  )}

                  {productDetail?.colors && (
                     <div className="mt-14 flex flex-col items-start justify-between gap-7 border-b border-solid border-[#E4EAF0] pb-5 customMd:flex-row customMd:gap-3">
                        <div className="flex shrink-0 items-center gap-1 text-sm">
                           <ColorLensOutlinedIcon fontSize="small" color="customBlue" />
                           <p>رنگ های موجود :</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                           {productDetail?.colors?.map(
                              item =>
                                 item.stock > 0 && (
                                    <div
                                       key={item.id}
                                       className={
                                          chosenColor?.id === item.id
                                             ? 'size-[34px] shrink-0 rounded-full border-2 border-solid border-black p-1'
                                             : 'size-[34px]'
                                       }
                                    >
                                       <Fab
                                          className="!h-full !min-h-0 !w-full !rounded-full"
                                          sx={{
                                             backgroundColor: item.color,
                                             ':hover': { backgroundColor: item.color },
                                          }}
                                          onClick={() => setChosenColor(item)}
                                       />
                                    </div>
                                 )
                           )}
                        </div>
                     </div>
                  )}

                  {productDetail?.colors && (
                     <div className="mt-8 flex items-start justify-between">
                        <p>قیمت :</p>
                        <div className="space-y-3">
                           {productDetail?.percentage ? (
                              <div className="flex items-center gap-2">
                                 <p className="rounded bg-[#139983] px-1 py-0.5 text-xs text-white">
                                    {productDetail?.percentage}%
                                 </p>
                                 <p className="text-sm text-textColor line-through">
                                    {Number(productDetail?.before_discount_price).toLocaleString()} تومان
                                 </p>
                              </div>
                           ) : null}
                           <p className="text-xl font-bold">{Number(productDetail?.price).toLocaleString()} تومان</p>
                        </div>
                     </div>
                  )}
                  <p className="mt-5 h-6 text-sm text-customPinkHigh">
                     {chosenColorStock <= 5 && `تنها ${chosenColorStock} عدد باقی مانده`}
                  </p>

                  {productDetail?.colors && (
                     <div className="mt-16 w-full customMd:mt-32 customLg:max-w-[390px]">
                        {!isInCart ? (
                           <LoadingButton
                              variant="contained"
                              size="large"
                              color="customPink3"
                              loading={addToBasketIsMutating || removeFromBasketIsMutating}
                              fullWidth
                              className="!rounded-10 !p-2"
                              onClick={addToBasketHandler}
                           >
                              <div className="flex w-full items-center justify-between transition-all duration-150">
                                 <p>افزودن به سبد خرید</p>

                                 <ShoppingBasketOutlinedIcon className="rounded-xl bg-white p-2 text-customPinkHigh" />
                              </div>
                           </LoadingButton>
                        ) : (
                           <div className="flex w-fit items-center gap-2 rounded-10 bg-customPink3 px-7 py-3 customXs:gap-4">
                              <IconButton
                                 className="!border !border-solid !border-customPinkHigh"
                                 sx={{ width: '22px', height: '22px' }}
                                 onClick={addToBasketHandler}
                                 disabled={
                                    addToBasketIsMutating ||
                                    removeFromBasketIsMutating ||
                                    chosenColorStock === isInCart?.count
                                 }
                              >
                                 <AddIcon color="customPinkHigh" className="!text-sm" />
                              </IconButton>
                              <div className="flex flex-col items-center">
                                 <p className="text-xl font-bold">
                                    {addToBasketIsMutating || removeFromBasketIsMutating ? '...' : isInCart?.count}
                                 </p>
                                 {chosenColorStock === isInCart?.count && (
                                    <p className="text-[11px] text-textColor">حداکثر</p>
                                 )}
                              </div>
                              <IconButton
                                 className={isInCart?.count !== 1 ? '!border !border-solid !border-textColor' : ''}
                                 sx={{ width: '22px', height: '22px' }}
                                 onClick={removeFromBasketHandler}
                                 disabled={addToBasketIsMutating || removeFromBasketIsMutating}
                              >
                                 {isInCart?.count === 1 ? (
                                    <DeleteOutlineOutlinedIcon color="textColor" />
                                 ) : (
                                    <RemoveIcon color="textColor" className="!text-sm" />
                                 )}
                              </IconButton>
                              <p className="text-sm customXs:ms-3">در سبد شما</p>
                           </div>
                        )}
                     </div>
                  )}
               </div>
            </Grid>
         </Grid>
         <div className="mt-20 bg-white px-5 py-7">
            <div>
               <Grid container columnSpacing={4}>
                  <Grid item xs={12} md={6}>
                     <div className="border-e border-solid border-[#E4EAF0] pe-4">
                        <div className="flex items-center gap-1 font-bold customMd:text-xl">
                           <SubjectIcon color="textColor" />
                           <p>ویژگی های محصول</p>
                        </div>
                        <div className="mt-8">
                           <div className="flex items-center justify-between rounded-10 bg-[#F5F8FC] px-3 py-5 text-sm">
                              <p className="text-textColor">وزن</p>
                              <p>300 گرم</p>
                           </div>
                           <div className="flex items-center justify-between rounded-10 px-3 py-5 text-sm">
                              <p className="text-textColor">ابعاد</p>
                              <p>{productDetail?.dimensions}</p>
                           </div>
                        </div>
                     </div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <div className="mt-14 customMd:mt-0">
                        <div className="flex items-center gap-1 font-bold customMd:text-xl">
                           <DescriptionOutlinedIcon color="textColor" />
                           <p>درباره محصول</p>
                        </div>

                        <p className="my-7 text-[15px] font-bold">{productDetail?.title}</p>

                        <pre className="whitespace-pre-line text-sm text-textColor">{productDetail?.description}</pre>
                     </div>
                  </Grid>
               </Grid>
            </div>

            {/* <div className="mt-16 border border-solid border-[#E4EAF0] p-5 customMd:mt-10">
               <div className="flex flex-wrap items-center gap-3 text-customBlue customSm:flex-nowrap customSm:gap-6">
                  <div className="flex items-center gap-2">
                     <QuestionAnswerOutlinedIcon fontSize="small" />
                     <p className="text-lg">نظرات کاربران</p>
                  </div>
                  <p className="text-[13px]">
                     {commentsData?.[Number(commentsData?.length) - 1]?.total_objects} نظر ثبت شده
                  </p>
               </div>

               <div className="mt-10 max-w-[800px]">
                  {commentsIsLoading ? (
                     <div className="flex items-center justify-center">
                        <CircularProgress color="customPink" />
                     </div>
                  ) : commentsData?.[Number(commentsData?.length) - 1]?.total_objects === 0 ? (
                     <div className="flex h-full flex-col items-center justify-center customMd:mt-6">
                        <p className="text-center text-sm text-textColor">نظری برای این محصول ثبت نشده است</p>
                        <p className="mt-2 text-center text-lg font-bold">همین الان نظر خود را ثبت کنید</p>
                     </div>
                  ) : (
                     <div className="space-y-8">
                        {commentsData?.map(item =>
                           item?.result?.map(innerItem => (
                              <Comment key={innerItem?.id} detail={innerItem} commentsMutate={commentsMutate} />
                           ))
                        )}

                        {commentsData?.length !== commentsData?.[Number(commentsData?.length) - 1]?.total_pages && (
                           <div className="flex justify-center">
                              <LoadingButton
                                 color="customPink"
                                 endIcon={<KeyboardArrowDownIcon />}
                                 onClick={() => commentsSetSize(commentsSize + 1)}
                                 loading={commentsIsValidating}
                              >
                                 مشاهده نظرات بیشتر
                              </LoadingButton>
                           </div>
                        )}
                     </div>
                  )}

                  <div className="customMd:mt-16">
                     <AddComment productDetail={productDetail} commentsMutate={commentsMutate} />
                  </div>
               </div>
            </div> */}
         </div>
         <section className="mt-20">
            <div className="flex items-center justify-between border-b border-solid border-[#E4EAF0] pb-2">
               <div className="flex items-center gap-2">
                  <Image src={categoriesIcon} alt="categories" />
                  <p className="text-lg font-bold text-textColor">محصولات مشابه</p>
               </div>
               <Link href={`/categoryDetail?category=${productDetail?.category}`} className="hidden customMd:block">
                  <Button endIcon={<KeyboardArrowLeftIcon />} color="textColor">
                     مشاهده همه
                  </Button>
               </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 overflow-auto pb-5">
               {categoryItems?.map(item => (
                  <ProductCard key={item.id} detail={item} />
               ))}
            </div>

            <Link href={`/categoryDetail?category=${productDetail?.category}`} className="mt-8 block customMd:hidden">
               <Button
                  color="white"
                  variant="contained"
                  size="large"
                  className="!rounded-10 !py-4 !text-customPinkHigh hover:!bg-[#dccfe9]"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
               >
                  مشاهده همه
               </Button>
            </Link>
         </section>
      </div>
   );
}

export default ProductDetail;

export async function getServerSideProps(context) {
   const { query } = context;

   try {
      const productDetail = await axiosInstance(`store/products/get_update_destroy/?title=${query?.productTitle}`).then(
         res => res.data
      );

      const categoryItems = await axiosInstance(`store/products/list_create/?category=${productDetail?.category}`).then(
         res => res.data?.result?.filter(item => item?.title !== productDetail?.title)
      );

      return {
         props: {
            productDetail,
            categoryItems,
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
