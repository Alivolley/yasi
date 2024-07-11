import { useState } from 'react';
import Head from 'next/head';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button, IconButton } from '@mui/material';

// Icons
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';
import ConfirmModal from '@/components/templates/confirm-modal/confirm-modal';
import AddEditCostModal from '@/components/pages/adminPanel/addEditCostModal/addEditCostModal';

// Apis
import useDeleteCost from '@/apis/pAdmin/shipping-cost/useDeleteCost';
import useGetCosts from '@/apis/pAdmin/shipping-cost/useGetCosts';

// Utils
import permissions from '@/utils/permission';

function ShippingCost() {
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(14);
   const [showAddEditCostModal, setShowAddEditCostModal] = useState(false);
   const [chosenCostForDelete, setChosenCostForDelete] = useState();
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [chosenCostForEdit, setChosenCostForEdit] = useState();

   const userInfo = useSelector(state => state?.userInfoReducer);

   const { data: costsList, isLoading: costsIsLoading, mutate: costsMutate } = useGetCosts(pageStatus, countValue);
   const { trigger: deleteCostTrigger, isMutating: deleteCostIsMutating } = useDeleteCost();

   const closeAddEditCostModalHandler = () => {
      setShowAddEditCostModal(false);
      setChosenCostForEdit();
   };

   const closeDeleteCostModal = () => {
      setShowDeleteModal(false);
      setChosenCostForDelete();
   };

   const deleteCostHandler = () => {
      deleteCostTrigger(chosenCostForDelete.id, {
         onSuccess: () => {
            costsMutate();
            closeDeleteCostModal();
         },
      });
   };

   const columns = [
      { id: 1, title: 'ردیف', key: 'index' },
      { id: 2, title: 'طول', key: 'length', renderCell: data => <p dir="ltr">{data?.length} cm</p> },
      { id: 3, title: 'عرض', key: 'width', renderCell: data => <p dir="ltr">{data?.width} cm</p> },
      { id: 4, title: 'ارتفاع', key: 'height', renderCell: data => <p dir="ltr">{data?.height} cm</p> },
      {
         id: 5,
         title: 'قیمت کارتون',
         key: 'carton_cost',
         renderCell: data => <p>{Number(data?.carton_cost).toLocaleString('fa-IR')} تومان</p>,
      },
      {
         id: 5,
         title: 'قیمت پست',
         key: 'postage_fee',
         renderCell: data => <p>{Number(data?.postage_fee).toLocaleString('fa-IR')} تومان</p>,
      },
      {
         id: 5,
         title: 'جمع قیمت',
         key: 'total',
         renderCell: data => <p>{Number(data?.total).toLocaleString('fa-IR')} تومان</p>,
      },
      {
         id: 6,
         title: 'عملیات',
         key: 'actions',
         renderCell: data => (
            <div className="flex items-center justify-center gap-2">
               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenCostForEdit(data);
                     setShowAddEditCostModal(true);
                  }}
                  disabled={
                     !userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.SHIPPING_COST?.PATCH)
                  }
               >
                  <BorderColorOutlinedIcon fontSize="inherit" />
               </IconButton>
               <IconButton
                  size="small"
                  onClick={() => {
                     setShowDeleteModal(true);
                     setChosenCostForDelete(data);
                  }}
                  disabled={
                     !userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.SHIPPING_COST?.PATCH)
                  }
               >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
               </IconButton>
            </div>
         ),
      },
   ];

   return (
      <AdminLayout>
         <Head>
            <title>یاسی هوم - پنل ادمین</title>
         </Head>
         <div className="w-full bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <LocalShippingOutlinedIcon color="textColor" fontSize="small" />
                  <p className="font-bold">هزینه های ارسال</p>
               </div>

               <Button
                  startIcon={<AddCircleOutlinedIcon />}
                  color="customPinkHigh"
                  onClick={() => setShowAddEditCostModal(true)}
                  disabled={
                     !userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.SHIPPING_COST?.PATCH)
                  }
               >
                  افزودن قیمت
               </Button>
            </div>

            <div className="mx-auto mt-6 w-full">
               <Table
                  columns={columns}
                  rows={costsList?.result}
                  loading={costsIsLoading}
                  totalPages={costsList?.total_pages}
                  totalObjects={costsList?.total_objects}
                  pageStatus={pageStatus}
                  setPageStatus={setPageStatus}
                  countValue={countValue}
                  setCountValue={setCountValue}
               />
            </div>
         </div>

         <AddEditCostModal
            show={showAddEditCostModal}
            onClose={closeAddEditCostModalHandler}
            isEdit={!!chosenCostForEdit}
            detail={chosenCostForEdit}
            costsMutate={costsMutate}
         />

         <ConfirmModal
            open={showDeleteModal}
            closeModal={closeDeleteCostModal}
            title="آیا از حذف این هزینه مطمئن هستید ؟"
            confirmHandler={deleteCostHandler}
            confirmLoading={deleteCostIsMutating}
         />
      </AdminLayout>
   );
}

export default ShippingCost;

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
