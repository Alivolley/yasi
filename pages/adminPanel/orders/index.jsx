import Head from 'next/head';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button, Grid, IconButton } from '@mui/material';

// Icons
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import MoneyOffCsredOutlinedIcon from '@mui/icons-material/MoneyOffCsredOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';
import OrderDetailModal from '@/components/templates/order-detail-modal/order-detail-modal';
import EditOrderStatusModal from '@/components/pages/adminPanel/editOrderStatusModal/editOrderStatusModal';
import EditShippingCostModal from '@/components/pages/adminPanel/editShippingCostModal/editShippingCostModal';

// Apis
import useGetAllCards from '@/apis/pAdmin/orders/useGetAllCards';

// Utils
import permissions from '@/utils/permission';

function Orders() {
   const [chosenFilter, setChosenFilter] = useState('');
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(6);
   const [chosenOrderForDetail, setChosenOrderForDetail] = useState();
   const [showDetailModal, setShowDetailModal] = useState(false);
   const [showEditStatusModal, setShowEditStatusModal] = useState(false);
   const [chosenOrderForEdit, setChosenOrderForEdit] = useState();
   const [showEditShippingCostModal, setShowEditShippingCostModal] = useState(false);

   const userInfo = useSelector(state => state?.userInfoReducer);

   const {
      data: cardsData,
      isLoading: cardsIsLoading,
      mutate: cardMutate,
   } = useGetAllCards(chosenFilter, pageStatus, countValue);

   const { back, pathname } = useRouter();

   const closeDetailModal = () => {
      setShowDetailModal(false);
      setChosenOrderForDetail();
   };

   const closeEditStatusModal = () => {
      setShowEditStatusModal(false);
      setChosenOrderForEdit();
   };

   useEffect(() => {
      if (userInfo?.phone_number && !userInfo?.is_admin) {
         back();
         toast.warn('شما اجازه دسترسی به این صفحه را ندارید');
      }
   }, [userInfo, pathname]);

   const columns = [
      { id: 1, title: 'ردیف', key: 'index' },
      { id: 2, title: 'نام سفارش دهنده', key: 'title', renderCell: data => data?.user?.name },
      { id: 3, title: 'کد سفارش', key: 'order_code' },
      {
         id: 4,
         title: 'قیمت',
         key: 'Total price',
         renderCell: data => `${Number(data?.final_price).toLocaleString()} تومان`,
      },
      {
         id: 5,
         title: 'وضعیت',
         key: 'status',
         renderCell: data =>
            data?.status === 'sending' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-customGold px-2 py-1 text-xs text-white">
                  <LocalShippingOutlinedIcon className="!text-base" />
                  <p>درحال ارسال</p>
               </div>
            ) : data?.status === 'delivered' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#2EC4B6] px-2 py-1 text-xs text-white">
                  <CheckCircleOutlinedIcon className="!text-base" />
                  <p>تحویل داده شده</p>
               </div>
            ) : data?.status === 'returned' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#CBB464] px-2 py-1 text-xs text-white">
                  <ReplayIcon className="!text-base" />
                  <p>مرجوعی</p>
               </div>
            ) : data?.status === 'unpaid' ? (
               <div className="mx-auto flex w-fit items-center gap-1 rounded-lg bg-[#F03A50] px-2 py-1 text-xs text-white">
                  <MoneyOffCsredOutlinedIcon className="!text-base" />
                  <p>پرداخت نشده</p>
               </div>
            ) : null,
      },
      {
         id: 6,
         title: 'عملیات',
         key: 'actions',
         renderCell: data => (
            <div className="flex items-center justify-center gap-3">
               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenOrderForEdit(data);
                     setShowEditStatusModal(true);
                  }}
                  disabled={
                     !userInfo?.is_super_admin &&
                     !userInfo?.permissions?.includes(permissions?.CHANGE_CART_STATUS?.PATCH)
                  }
               >
                  <BorderColorOutlinedIcon fontSize="inherit" />
               </IconButton>
               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenOrderForDetail(data);
                     setShowDetailModal(true);
                  }}
               >
                  <FolderOutlinedIcon fontSize="small" />
               </IconButton>
            </div>
         ),
      },
   ];

   return (
      <AdminLayout>
         <Head>
            <title>یاسی - پنل ادمین</title>
         </Head>
         <div>
            <Grid container spacing={2}>
               <Grid item xs={6} lg={2.4}>
                  <button
                     type="button"
                     onClick={() => {
                        setChosenFilter('');
                        setPageStatus(1);
                     }}
                     className={`w-full cursor-pointer h-full border border-solid border-[#DFEBF1] bg-white
                      customMd:px-5 customMd:py-6 p-3 text-center text-base customMd:text-xl font-dana`}
                  >
                     <p className={chosenFilter === '' ? 'text-black' : 'text-[#98A2B2]'}>همه ی سفارشات</p>
                     <p
                        className={`font-bold ${
                           chosenFilter === '' ? 'mt-3 text-customPinkHigh customMd:mt-5' : 'text-[#98A2B2]'
                        }`}
                     >
                        {chosenFilter === '' && cardsData?.total_objects}
                     </p>
                  </button>
               </Grid>
               <Grid item xs={6} lg={2.4}>
                  <button
                     type="button"
                     onClick={() => {
                        setChosenFilter('sending');
                        setPageStatus(1);
                     }}
                     className={`w-full cursor-pointer h-full border border-solid border-[#DFEBF1] bg-white
                      customMd:px-5 customMd:py-6 p-3 text-center text-base customMd:text-xl font-dana`}
                  >
                     <p className={chosenFilter === 'sending' ? 'text-black' : 'text-[#98A2B2]'}>در حال ارسال</p>
                     <p
                        className={`font-bold ${
                           chosenFilter === 'sending' ? 'mt-3 text-customPinkHigh customMd:mt-5' : 'text-[#98A2B2]'
                        }`}
                     >
                        {chosenFilter === 'sending' && cardsData?.total_objects}
                     </p>
                  </button>
               </Grid>

               <Grid item xs={6} lg={2.4}>
                  <button
                     type="button"
                     onClick={() => {
                        setChosenFilter('delivered');
                        setPageStatus(1);
                     }}
                     className={`w-full cursor-pointer h-full border border-solid border-[#DFEBF1] bg-white
                      customMd:px-5 customMd:py-6 p-3 text-center text-base customMd:text-xl font-dana`}
                  >
                     <p className={chosenFilter === 'delivered' ? 'text-black' : 'text-[#98A2B2]'}>تحویل داده شده</p>
                     <p
                        className={`font-bold ${
                           chosenFilter === 'delivered' ? 'mt-3 text-customPinkHigh customMd:mt-5' : 'text-[#98A2B2]'
                        }`}
                     >
                        {chosenFilter === 'delivered' && cardsData?.total_objects}
                     </p>
                  </button>
               </Grid>

               <Grid item xs={6} lg={2.4}>
                  <button
                     type="button"
                     onClick={() => {
                        setChosenFilter('returned');
                        setPageStatus(1);
                     }}
                     className={`w-full cursor-pointer h-full border border-solid border-[#DFEBF1] bg-white
                      customMd:px-5 customMd:py-6 p-3 text-center text-base customMd:text-xl font-dana`}
                  >
                     <p className={chosenFilter === 'returned' ? 'text-black' : 'text-[#98A2B2]'}>مرجوعی</p>
                     <p
                        className={`font-bold ${
                           chosenFilter === 'returned' ? 'mt-3 text-customPinkHigh customMd:mt-5' : 'text-[#98A2B2]'
                        }`}
                     >
                        {chosenFilter === 'returned' && cardsData?.total_objects}
                     </p>
                  </button>
               </Grid>

               <Grid item xs={6} lg={2.4}>
                  <button
                     type="button"
                     onClick={() => {
                        setChosenFilter('unpaid');
                        setPageStatus(1);
                     }}
                     className={`w-full cursor-pointer h-full border border-solid border-[#DFEBF1] bg-white
                      customMd:px-5 customMd:py-6 p-3 text-center text-base customMd:text-xl font-dana`}
                  >
                     <p className={chosenFilter === 'unpaid' ? 'text-black' : 'text-[#98A2B2]'}>پرداخت نشده</p>
                     <p
                        className={`font-bold ${
                           chosenFilter === 'unpaid' ? 'mt-3 text-customPinkHigh customMd:mt-5' : 'text-[#98A2B2]'
                        }`}
                     >
                        {chosenFilter === 'unpaid' && cardsData?.total_objects}
                     </p>
                  </button>
               </Grid>
            </Grid>
         </div>

         <div className="mt-6 w-full bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <QrCodeOutlinedIcon color="textColor" fontSize="small" />
                  <p className="font-bold">لیست سفارشات</p>
               </div>

               <Button
                  startIcon={<AddCircleOutlinedIcon />}
                  color="customPinkHigh"
                  onClick={() => setShowEditShippingCostModal(true)}
                  disabled={
                     !userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.SHIPPING_COST?.PATCH)
                  }
               >
                  تغییر هزینه ارسال
               </Button>
            </div>

            <div className="mx-auto mt-6 w-full">
               <Table
                  columns={columns}
                  rows={cardsData?.result}
                  pageStatus={pageStatus}
                  setPageStatus={setPageStatus}
                  totalPages={cardsData?.total_pages}
                  totalObjects={cardsData?.total_objects}
                  loading={cardsIsLoading}
                  countValue={countValue}
                  setCountValue={setCountValue}
               />
            </div>
         </div>

         <OrderDetailModal show={showDetailModal} onClose={closeDetailModal} detail={chosenOrderForDetail} />

         <EditOrderStatusModal
            show={showEditStatusModal}
            onClose={closeEditStatusModal}
            detail={chosenOrderForEdit}
            cardMutate={cardMutate}
         />

         <EditShippingCostModal show={showEditShippingCostModal} onClose={() => setShowEditShippingCostModal(false)} />
      </AdminLayout>
   );
}

export default Orders;

export async function getServerSideProps(context) {
   const { req } = context;
   const accessToken = req?.cookies?.yasi_accessToken;
   const refreshToken = req?.cookies?.yasi_refreshToken;

   if (accessToken && refreshToken) {
      return {
         props: {},
      };
   }

   return {
      redirect: {
         destination: '/login',
      },
   };
}
