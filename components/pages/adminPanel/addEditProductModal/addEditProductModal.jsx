import { toast } from 'react-toastify';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

// MUI
import {
   Backdrop,
   Box,
   Button,
   Checkbox,
   CircularProgress,
   Dialog,
   FormControl,
   FormControlLabel,
   FormHelperText,
   Grid,
   IconButton,
   LinearProgress,
   MenuItem,
   Select,
   TextField,
} from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Data
import colorPallet from '@/data/color-pallet';

// Components
import ColorComponent from '../colorComponent/colorComponent';

// Apis
import useGetAllCategories from '@/apis/pAdmin/products/useGetAllCategories';
import useAddProduct from '@/apis/pAdmin/products/useAddProduct';
import useGetProductDetail from '@/apis/pAdmin/products/useGetProductDetail';
import useEditProduct from '@/apis/pAdmin/products/useEditProduct';

function AddEditProductModal({ show, onClose, isEdit = false, detail, productsMutate }) {
   const [coverImage, setCoverImage] = useState();
   const [coverImageURL, setCoverImageURL] = useState();
   const [pictures, setPictures] = useState([]);
   const [picturesURL, setPicturesURL] = useState([]);
   const [EditPictures, setEditPictures] = useState([]);
   const [editPicturesURL, setEditPicturesURL] = useState([]);
   const [colorsAndCount, setColorsAndCount] = useState([]);
   const [deletedIds, setDeletedIds] = useState([]);
   const [uploadPercent, setUploadPercent] = useState(0);

   const { data: productDetail, isLoading: productDetailIsLoading } = useGetProductDetail(detail?.title);
   const { data: categoryList } = useGetAllCategories();
   const { trigger: addProductTrigger, isMutating: addProductIsMutating } = useAddProduct(
      pictures,
      colorsAndCount,
      setUploadPercent
   );
   const { trigger: editProductTrigger, isMutating: editProductIsMutating } = useEditProduct(
      EditPictures,
      deletedIds,
      colorsAndCount,
      setUploadPercent,
      productDetail?.title,
      productDetail?.id
   );

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      control,
   } = useForm({
      defaultValues: {
         productName: '',
         price: '',
         categoryId: '',
         dimensions: '',
         description: '',
         discountType: 'percent',
         discount: '',
         showProduct: true,
         isBold: false,
      },
      mode: 'onSubmit',
   });

   useEffect(() => {
      if (isEdit && productDetail) {
         setValue('productName', productDetail?.title);
         setValue('price', productDetail?.price);
         setValue('dimensions', productDetail?.dimensions);
         setValue('description', productDetail?.description);
         setValue('showProduct', productDetail?.public);
         setValue('isBold', productDetail?.is_bold);
         if (productDetail?.discount_amount > 0) {
            setValue('discountType', 'amount');
            setValue('discount', productDetail?.discount_amount);
         } else if (productDetail?.discount_percent > 0) {
            setValue('discountType', 'percent');
            setValue('discount', productDetail?.discount_percent);
         }
         const foundedCategory = categoryList?.find(item => item?.title === productDetail?.category);
         setValue('categoryId', foundedCategory?.id);
         setColorsAndCount(productDetail?.colors?.map(item => ({ color: item?.color, stock: item?.stock })));
         setCoverImage(productDetail?.cover);
         setCoverImageURL(productDetail?.cover);
         setPictures(productDetail?.images);
         setPicturesURL(productDetail?.images);
      }
   }, [detail, productDetail]);

   const closeModalHandler = () => {
      onClose();
      setPictures([]);
      setPicturesURL([]);
      setEditPictures([]);
      setEditPicturesURL([]);
      setCoverImage();
      setCoverImageURL();
      setColorsAndCount([]);
      setDeletedIds([]);
      if (!isEdit) {
         reset();
      }
   };
   const formSubmit = data => {
      if (!coverImage) {
         toast.info('لطفا برای محصول خود کاور انتخاب کنید');
      } else if (!pictures?.length && !EditPictures?.length) {
         toast.info('لطفا برای محصول خود عکس انتخاب کنید');
      } else if (!colorsAndCount?.length) {
         toast.info('لطفا رنگ های مورد نظر خود را انتخاب کنید');
      } else {
         setUploadPercent(0);

         const newProduct = new FormData();
         newProduct.append('category', data.categoryId);
         newProduct.append('title', data.productName);
         newProduct.append('description', data.description);
         newProduct.append('dimensions', data.dimensions);
         newProduct.append('price', data.price);
         newProduct.append('public', data.showProduct);
         newProduct.append('is_bold', data.isBold);
         if (productDetail?.cover !== coverImage) {
            newProduct.append('cover', coverImage);
         }
         if (data.discountType === 'percent') {
            newProduct.append('discount_percent', data.discount);
         } else if (data.discountType === 'amount') {
            newProduct.append('discount_amount', data.discount);
         }

         if (isEdit) {
            editProductTrigger(newProduct, {
               onSuccess: () => {
                  productsMutate();
                  closeModalHandler();
                  toast.success('محصول ویرایش شد');
               },
            });
         } else {
            addProductTrigger(newProduct, {
               onSuccess: () => {
                  productsMutate();
                  closeModalHandler();
                  toast.success('محصول اضافه شد');
               },
            });
         }
      }
   };

   const inputPicturesChangeHandler = e => {
      if (e?.target?.files[0]) {
         const files = Array.from(e?.target?.files);

         if (isEdit) {
            files?.forEach(item => {
               setEditPictures(prev => [...prev, item]);
               const itemURL = URL.createObjectURL(item);
               setEditPicturesURL(prev => [...prev, { source: itemURL, wholeItem: item }]);
            });
         } else {
            files?.forEach(item => {
               setPictures(prev => [...prev, item]);
               const itemURL = URL.createObjectURL(item);
               setPicturesURL(prev => [...prev, { source: itemURL, wholeItem: item }]);
            });
         }
      }
   };

   const removePictureHandler = pic => {
      if (isEdit) {
         const isOld = pictures?.find(item => item?.id === pic?.id);
         if (isOld) {
            setPictures(prev => {
               const newPictures = prev?.filter(item => item?.id !== pic?.id);
               return newPictures;
            });

            setPicturesURL(prev => {
               const newPicturesURL = prev.filter(item => item?.id !== pic?.id);
               return newPicturesURL;
            });

            setDeletedIds(prev => [...prev, pic?.id]);
         } else {
            setEditPictures(prev => {
               const newPictures = prev?.filter(item => item !== pic?.wholeItem);
               return newPictures;
            });

            setEditPicturesURL(prev => {
               const newPicturesURL = prev.filter(item => item !== pic);
               return newPicturesURL;
            });
         }
      } else {
         setPictures(prev => {
            const newPictures = prev?.filter(item => item !== pic?.wholeItem);
            return newPictures;
         });

         setPicturesURL(prev => {
            const newPicturesURL = prev.filter(item => item !== pic);
            return newPicturesURL;
         });
      }
   };

   const inputCoverChangeHandler = e => {
      if (e?.target?.files[0]) {
         const file = e?.target?.files[0];
         setCoverImage(file);
         const fileURL = URL.createObjectURL(file);
         setCoverImageURL(fileURL);
      }
   };

   const removeCoverHandler = () => {
      setCoverImage();
      setCoverImageURL();
   };

   return (
      <Dialog open={show} onClose={closeModalHandler} fullWidth maxWidth="xl">
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] flex items-center justify-between border-b border-solid border-[#E4EAF0] bg-white pb-2 pt-3">
               <p className="text-lg font-bold">{!isEdit ? 'افزودن محصول' : 'ویرایش محصول'}</p>
               <IconButton onClick={closeModalHandler}>
                  <CloseIcon />
               </IconButton>
            </div>

            {isEdit && productDetailIsLoading ? (
               <div className="my-16 flex w-full items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : (
               <>
                  <div className="mt-5 border-b border-solid border-[#E4EAF0] pb-6">
                     <p className="mb-3 text-sm font-bold text-textColor">عکس کاور</p>

                     <div className="flex flex-wrap items-end gap-4">
                        <div className="flex flex-wrap items-center gap-5">
                           {coverImageURL ? (
                              <div className="relative flex aspect-square w-28 shrink-0 items-center justify-center rounded-2xl border border-solid border-[#9da8ba48]">
                                 <Image src={coverImageURL} alt="pic" className="rounded-2xl object-cover" fill />
                                 <div className="absolute end-0 top-0">
                                    <IconButton
                                       onClick={() => removeCoverHandler()}
                                       sx={{
                                          backgroundColor: '#FB7185',
                                          transition: 'all 0.2s',
                                          ':hover': { backgroundColor: '#FB7185', color: 'white !important' },
                                       }}
                                       size="small"
                                    >
                                       <CloseIcon fontSize="small" color="inherit" />
                                    </IconButton>
                                 </div>
                              </div>
                           ) : (
                              <div className="relative aspect-square w-28 rounded-2xl border border-dashed border-[#9DA8BA] bg-[#F5F8FC]">
                                 <input
                                    type="file"
                                    className="absolute inset-0 cursor-pointer opacity-0"
                                    accept="image/*"
                                    onChange={inputCoverChangeHandler}
                                    multiple
                                 />
                              </div>
                           )}
                        </div>
                        <Button
                           variant="contained"
                           color="customGold"
                           className="!relative !cursor-pointer !rounded-10 !text-white"
                           size="small"
                        >
                           افزودن عکس جدید
                           <input
                              type="file"
                              className="absolute inset-0 cursor-pointer opacity-0"
                              accept="image/*"
                              onChange={inputCoverChangeHandler}
                           />
                        </Button>
                     </div>
                  </div>

                  <div className="my-8 mt-5">
                     <p className="mb-3 text-sm font-bold text-textColor">عکس محصول</p>
                     <div className="flex flex-wrap items-end gap-4">
                        <div className="flex flex-wrap items-center gap-5">
                           {picturesURL?.map(item => (
                              <div
                                 key={item?.source || item?.image}
                                 className="relative flex aspect-square w-28 shrink-0 items-center justify-center rounded-2xl border border-solid border-[#9da8ba48]"
                              >
                                 <Image
                                    src={item?.source || item?.image}
                                    alt="pic"
                                    className="rounded-2xl object-cover"
                                    fill
                                 />
                                 <div className="absolute end-0 top-0">
                                    <IconButton
                                       onClick={() => removePictureHandler(item)}
                                       sx={{
                                          backgroundColor: '#FB7185',
                                          transition: 'all 0.2s',
                                          ':hover': { backgroundColor: '#FB7185', color: 'white !important' },
                                       }}
                                       size="small"
                                    >
                                       <CloseIcon fontSize="small" color="inherit" />
                                    </IconButton>
                                 </div>
                              </div>
                           ))}
                           {isEdit &&
                              editPicturesURL?.map(item => (
                                 <div
                                    key={item?.source || item?.image}
                                    className="relative flex aspect-square w-28 shrink-0 items-center justify-center rounded-2xl border border-solid border-[#9da8ba48]"
                                 >
                                    <Image
                                       src={item?.source || item?.image}
                                       alt="pic"
                                       className="rounded-2xl object-cover"
                                       fill
                                    />
                                    <div className="absolute end-0 top-0">
                                       <IconButton
                                          onClick={() => removePictureHandler(item)}
                                          sx={{
                                             backgroundColor: '#FB7185',
                                             transition: 'all 0.2s',
                                             ':hover': { backgroundColor: '#FB7185', color: 'white !important' },
                                          }}
                                          size="small"
                                       >
                                          <CloseIcon fontSize="small" color="inherit" />
                                       </IconButton>
                                    </div>
                                 </div>
                              ))}

                           <div className="relative aspect-square w-28 rounded-2xl border border-dashed border-[#9DA8BA] bg-[#F5F8FC]">
                              <input
                                 type="file"
                                 className="absolute inset-0 cursor-pointer opacity-0"
                                 accept="image/*"
                                 onChange={inputPicturesChangeHandler}
                                 multiple
                              />
                           </div>
                        </div>
                        <Button
                           variant="contained"
                           color="customGold"
                           className="!relative !cursor-pointer !rounded-10 !text-white"
                           size="small"
                        >
                           افزودن عکس جدید
                           <input
                              type="file"
                              className="absolute inset-0 cursor-pointer opacity-0"
                              accept="image/*"
                              onChange={inputPicturesChangeHandler}
                              multiple
                           />
                        </Button>
                     </div>
                  </div>

                  <div className="my-5 border-y border-solid border-[#E4EAF0] pb-5 pt-8">
                     <p className="mb-8 text-sm font-bold text-textColor">رنگ و تعداد محصول را انتخاب کنید</p>

                     <div className="flex flex-wrap items-start gap-3">
                        {colorPallet?.map(item => (
                           <ColorComponent
                              key={item?.id}
                              colorsAndCount={colorsAndCount}
                              setColorsAndCount={setColorsAndCount}
                              detail={item}
                           />
                        ))}
                     </div>
                  </div>

                  <form onSubmit={handleSubmit(formSubmit)}>
                     <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-textColor">نام محصول</p>
                              <TextField
                                 fullWidth
                                 {...register('productName', {
                                    required: { value: true, message: 'این فیلد اجباری است' },
                                 })}
                                 error={!!errors?.productName}
                                 helperText={errors?.productName?.message}
                              />
                           </div>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-textColor">دسته بندی محصول</p>
                              <Controller
                                 control={control}
                                 name="categoryId"
                                 rules={{ required: 'این فیلد اجباری است' }}
                                 render={({ field: { onChange, value }, fieldState }) => (
                                    <FormControl error={!!errors?.categoryId}>
                                       <Select value={value} onChange={onChange}>
                                          {categoryList?.map(item => (
                                             <MenuItem className="!text-sm" value={item?.id} key={item?.id}>
                                                {item?.title}
                                             </MenuItem>
                                          ))}
                                       </Select>
                                       {fieldState.invalid
                                          ? errors?.categoryId?.message && (
                                               <FormHelperText error>{errors?.categoryId?.message}</FormHelperText>
                                            )
                                          : null}
                                    </FormControl>
                                 )}
                              />
                           </div>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-textColor">قیمت ( تومان )</p>
                              <TextField
                                 fullWidth
                                 type="number"
                                 sx={{
                                    input: {
                                       MozAppearance: 'textfield',
                                       appearance: 'textfield',
                                       '&::-webkit-inner-spin-button': {
                                          WebkitAppearance: 'none',
                                          appearance: 'none',
                                       },
                                    },
                                 }}
                                 {...register('price', { required: { value: true, message: 'این فیلد اجباری است' } })}
                                 error={!!errors?.price}
                                 helperText={errors?.price?.message}
                              />
                           </div>
                        </Grid>
                     </Grid>

                     <br />
                     <br />
                     <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-textColor">ابعاد</p>
                              <TextField
                                 fullWidth
                                 {...register('dimensions', {
                                    required: { value: true, message: 'این فیلد اجباری است' },
                                 })}
                                 error={!!errors?.dimensions}
                                 helperText={errors?.dimensions?.message}
                              />
                           </div>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-textColor">تخفیف</p>
                              <div className="flex">
                                 <div className="shrink-0">
                                    <Controller
                                       control={control}
                                       name="discountType"
                                       rules={{ required: 'این فیلد اجباری است' }}
                                       render={({ field: { onChange, value } }) => (
                                          <FormControl>
                                             <Select value={value} onChange={onChange} className="!text-sm">
                                                <MenuItem className="!text-sm" value="percent">
                                                   درصد
                                                </MenuItem>
                                                <MenuItem className="!text-sm" value="amount">
                                                   مقدار
                                                </MenuItem>
                                             </Select>
                                          </FormControl>
                                       )}
                                    />
                                 </div>
                                 <div className="grow">
                                    <TextField
                                       fullWidth
                                       type="number"
                                       sx={{
                                          input: {
                                             MozAppearance: 'textfield',
                                             appearance: 'textfield',
                                             '&::-webkit-inner-spin-button': {
                                                WebkitAppearance: 'none',
                                                appearance: 'none',
                                             },
                                          },
                                       }}
                                       {...register('discount')}
                                       error={!!errors?.discount}
                                       helperText={errors?.discount?.message}
                                    />
                                 </div>
                              </div>
                           </div>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-1 flex-col gap-1">
                              <p className="mb-2 text-sm text-textColor">توضیحات</p>
                              <TextField
                                 fullWidth
                                 multiline
                                 rows={6}
                                 {...register('description', {
                                    required: { value: true, message: 'این فیلد اجباری است' },
                                 })}
                                 error={!!errors?.description}
                                 helperText={errors?.description?.message}
                              />
                           </div>
                        </Grid>
                     </Grid>

                     <br />
                     <br />
                     <Grid container spacing={4}>
                        <Grid item xs={12} md={6} lg={4}>
                           <div className="flex flex-col gap-3">
                              <Controller
                                 control={control}
                                 name="showProduct"
                                 render={({ field: { onChange, value } }) => (
                                    <FormControlLabel
                                       control={<Checkbox checked={value} />}
                                       label="نمایش محصول به کاربران"
                                       value={value}
                                       onChange={onChange}
                                    />
                                 )}
                              />

                              <Controller
                                 control={control}
                                 name="isBold"
                                 render={({ field: { onChange, value } }) => (
                                    <FormControlLabel
                                       control={<Checkbox checked={value} />}
                                       label="محصول بولد"
                                       value={value}
                                       onChange={onChange}
                                    />
                                 )}
                              />
                           </div>
                        </Grid>
                     </Grid>

                     <div className="mt-16">
                        <Button
                           variant="contained"
                           color="customPinkHigh"
                           fullWidth
                           className="!rounded-10 !py-3 !text-white"
                           size="large"
                           type="submit"
                        >
                           {!isEdit ? 'افزودن محصول' : 'ویرایش محصول'}
                        </Button>
                     </div>
                  </form>
               </>
            )}
         </div>

         <Backdrop sx={{ zIndex: 2 }} open={addProductIsMutating || editProductIsMutating}>
            <div className="flex w-full max-w-[200px] flex-col items-center justify-center gap-7 rounded-md bg-[#f5f8fc] px-5 py-10 customMd:max-w-[300px]">
               <p className="text-lg font-bold">در حال ارسال اطلاعات ...</p>
               <div className="flex w-full items-center justify-between gap-3">
                  <p className="font-bold">{uploadPercent}%</p>
                  <Box sx={{ width: '100%' }}>
                     <LinearProgress
                        variant={uploadPercent > 0 ? 'determinate' : 'indeterminate'}
                        value={uploadPercent}
                        color="customPink"
                     />
                  </Box>
               </div>
            </div>
         </Backdrop>
      </Dialog>
   );
}

export default AddEditProductModal;
