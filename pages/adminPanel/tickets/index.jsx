import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

// MUI
import { IconButton } from '@mui/material';

// Icons
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

// Redux
import { useSelector } from 'react-redux';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';
import EditTicketModal from '@/components/pages/adminPanel/editTicketModal/editTicketModal';

// Apis
import useGetTickets from '@/apis/pAdmin/tickets/useGetTickets';

function Tickets() {
   const [pageStatus, setPageStatus] = useState(1);
   const [countValue, setCountValue] = useState(6);
   const [chosenTicketForEdit, setChosenTicketForEdit] = useState();
   const [showEditTicketModal, setShowEditTicketModal] = useState(false);

   const { back, pathname } = useRouter();
   const userInfo = useSelector(state => state?.userInfoReducer);

   const closeEditStatusModal = () => {
      setShowEditTicketModal(false);
      setChosenTicketForEdit();
   };

   const {
      data: ticketsList,
      isLoading: ticketsIsLoading,
      mutate: ticketsMutate,
   } = useGetTickets(pageStatus, countValue);

   useEffect(() => {
      if (userInfo?.phone_number && !userInfo?.is_admin) {
         back();
         toast.warn('شما اجازه دسترسی به این صفحه را ندارید');
      }
   }, [userInfo, pathname]);

   const columns = [
      { id: 1, title: 'ردیف', key: 'index' },
      { id: 2, title: 'نام', key: 'first_name' },
      { id: 3, title: 'نام خانوادگی', key: 'last_name' },
      { id: 4, title: 'شماره تلفن', key: 'phone_number' },
      {
         id: 5,
         title: 'وضعیت',
         key: 'Status',
         renderCell: data =>
            data?.has_seen ? (
               <p className="text-green-500">خوانده شده</p>
            ) : (
               <p className="text-customPinkHigh">خوانده نشده</p>
            ),
      },
      {
         id: 6,
         title: 'عملیات',
         key: 'actions',
         renderCell: data => (
            <IconButton
               size="small"
               onClick={() => {
                  setChosenTicketForEdit(data);
                  setShowEditTicketModal(true);
               }}
            >
               <BorderColorOutlinedIcon fontSize="inherit" />
            </IconButton>
         ),
      },
   ];

   return (
      <AdminLayout>
         <Head>
            <title>یاسی - پنل ادمین</title>
         </Head>

         <div className="w-full bg-white p-5">
            <div className="flex items-center gap-1.5">
               <ConfirmationNumberOutlinedIcon color="textColor" fontSize="small" />
               <p className="font-bold">لیست تیکت ها</p>
            </div>
            <div className="mx-auto mt-10 w-full">
               <Table
                  columns={columns}
                  rows={ticketsList?.result}
                  pageStatus={pageStatus}
                  setPageStatus={setPageStatus}
                  totalPages={ticketsList?.total_pages}
                  totalObjects={ticketsList?.total_objects}
                  loading={ticketsIsLoading}
                  countValue={countValue}
                  setCountValue={setCountValue}
               />
            </div>
         </div>

         <EditTicketModal
            show={showEditTicketModal}
            onClose={closeEditStatusModal}
            detail={chosenTicketForEdit}
            ticketsMutate={ticketsMutate}
         />
      </AdminLayout>
   );
}

export default Tickets;

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
