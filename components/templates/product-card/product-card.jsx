import Image from 'next/image';
import { toast } from 'react-toastify';
import Link from 'next/link';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { LoadingButton } from '@mui/lab';

// Icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import StarIcon from '@mui/icons-material/Star';

// Assets
import ProductCardStyle from './product-card.style';
import noImage from '@/assets/images/noImage.png';

// Apis
import useToggleFavorites from '@/apis/favorites/useToggleFavorites';
import useGetFavorites from '@/apis/favorites/useGetFavorites';

function ProductCard({ detail, fullWidth }) {
   const isLogin = useSelector(state => state?.loginStatusReducer);

   const { trigger: toggleFavoriteTrigger, isMutating: toggleFavoriteIsMutating } = useToggleFavorites();
   const { data: favoritesData } = useGetFavorites(isLogin);
   const isLiked = favoritesData?.find(item => item?.id === detail?.id);

   const toggleLike = () => {
      if (isLogin) {
         toggleFavoriteTrigger(detail?.id);
      } else {
         toast.info('برای افزودن به علاقه مندی ها ، ابتدا وارد حساب کاربری خود شوید');
      }
   };

   return (
      <ProductCardStyle
         href={`/productDetail/${detail?.title}`}
         className={`shrink-0 rounded-10 bg-white p-2 ${
            fullWidth ? 'border border-solid border-[#E4EAF0]' : 'w-[180px] customMd:w-[250px]'
         }`}
      >
         <div
            className={`relative mb-5 flex items-center justify-center rounded-xl ${
               detail?.percentage ? 'bg-[#FCF7F7]' : 'bg-[#F5F8FC]'
            } ${fullWidth ? 'aspect-square' : 'h-[140px] customMd:h-[230px]'}`}
            id="categoryImage"
         >
            <Link href={`/productDetail/${detail?.title}`} className="relative size-full" target="_blank">
               <Image src={detail?.cover || noImage} alt={detail?.title} className="rounded-10 object-contain" fill />
            </Link>
            <div className="absolute end-1 top-1">
               <LoadingButton
                  className="!h-[25px] !w-[25px] !min-w-0 !bg-[#F5F8FC69] !p-0 customMd:!h-[30px] customMd:!w-[30px]"
                  variant="contained"
                  onClick={toggleLike}
                  loading={toggleFavoriteIsMutating}
               >
                  {isLiked ? <FavoriteIcon color="customPinkHigh" /> : <FavoriteBorderIcon color="customPinkHigh" />}
               </LoadingButton>
            </div>
            {detail?.percentage ? (
               <p
                  className="absolute start-1 top-1 bg-[#F2485D] px-0.5 pb-3 pt-1.5 text-xs text-white
                   customMd:px-[3px] customMd:pb-4 customMd:pt-2 customMd:text-sm"
                  id="discount"
               >
                  {detail?.percentage}%
               </p>
            ) : null}

            {detail?.not_exist && (
               <p className="absolute bottom-1 end-1 rounded-lg bg-[#F2485D] px-1.5 py-0.5 text-xs text-white customMd:bottom-2 customMd:end-2">
                  ناموجود
               </p>
            )}
         </div>
         <Link href={`/productDetail/${detail?.title}`} target="_blank">
            <div className="flex items-center justify-between gap-1">
               <p className="line-clamp-1 h-[22px] overflow-hidden text-sm font-bold customMd:text-base">
                  {detail?.title}
               </p>
               {detail?.colors && detail?.percentage ? (
                  <p className="whitespace-nowrap text-10 text-[#7E95B0] line-through customMd:text-xs">
                     {Number(detail?.before_discount_price).toLocaleString()} تومان
                  </p>
               ) : null}
            </div>
            <div className="mt-3 flex items-center justify-between gap-1">
               <p className="line-clamp-1 h-5 overflow-hidden text-10 text-[#7E95B0] max-customMd:leading-4 customMd:text-sm">
                  {detail?.category}
               </p>
               <p className="whitespace-nowrap text-[13px] font-bold text-customPinkHigh customMd:text-base">
                  {Number(detail?.price).toLocaleString()} تومان
               </p>
            </div>
         </Link>
      </ProductCardStyle>
   );
}

export default ProductCard;
