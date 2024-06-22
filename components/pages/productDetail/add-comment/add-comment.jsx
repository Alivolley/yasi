import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Rating, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Icons
import OutboxOutlinedIcon from '@mui/icons-material/OutboxOutlined';

// Apis
import useAddComment from '@/apis/comments/useAddComment';

function AddComment({ productDetail, commentsMutate }) {
   const isLogin = useSelector(state => state?.loginStatusReducer);

   const { trigger: addCommentTrigger, isMutating: addCommentIsMutating } = useAddComment();

   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      watch,
      reset,
   } = useForm({
      defaultValues: {
         rate: '5',
         comment: '',
      },
      mode: 'onSubmit',
   });

   const formSubmit = data => {
      if (isLogin) {
         const newComment = {
            message: data?.comment,
            product: productDetail?.id,
            score: Number(data?.rate),
         };

         addCommentTrigger(newComment, {
            onSuccess: () => {
               commentsMutate();
               reset();
            },
         });
      } else {
         toast.info('برای افزودن نظر ، ابتدا وارد حساب کاربری خود شوید');
      }
   };

   const rateValue = watch('rate');

   return (
      <form onSubmit={handleSubmit(formSubmit)}>
         <div className="flex flex-col items-center">
            <p className="mb-4 mt-20 text-center text-base customMd:mt-0">
               به سفارشتان از فروشگاه یاسی هوم چه امتیازی میدهید ؟
            </p>
            <p className="mb-3 rounded bg-[#C1F7EE] px-4 py-1.5 text-sm text-[#139983]">
               {rateValue === '5'
                  ? 'خیلی خوب'
                  : rateValue === '4'
                    ? 'خوب'
                    : rateValue === '3'
                      ? 'معمولی'
                      : rateValue === '2'
                        ? 'بد'
                        : rateValue === '1'
                          ? 'خیلی بد'
                          : null}
            </p>

            <div className="mb-9">
               <Controller
                  control={control}
                  name="rate"
                  render={({ field: { onChange, value } }) => <Rating value={Number(value)} onChange={onChange} />}
               />
            </div>
         </div>

         <TextField
            label="نظر خود را اینجا بنویسید"
            multiline
            rows={4}
            color="customPink"
            fullWidth
            {...register('comment', { required: { value: true } })}
            error={!!errors?.comment}
            helperText="مثال : کیفیت و قیمت ، اقلام سفارش ، بسته بندی سفارش و...."
         />

         <div className="mt-8 customSm:max-w-[300px]">
            <LoadingButton
               variant="contained"
               size="large"
               color="customPink3"
               fullWidth
               loading={addCommentIsMutating}
               className="!rounded-10 !p-2"
               type="submit"
            >
               <div className="flex w-full items-center justify-between">
                  <p>افزودن نظر</p>

                  <OutboxOutlinedIcon className="rounded-xl bg-white p-2 text-customPinkHigh" />
               </div>
            </LoadingButton>
         </div>
      </form>
   );
}

export default AddComment;
