import { useState } from 'react';
import Head from 'next/head';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button, IconButton } from '@mui/material';

// Icons
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

// Components
import AdminLayout from '@/components/layout/admin-layout/admin-layout';
import Table from '@/components/templates/table/table';
import AddEditQuestionModal from '@/components/pages/adminPanel/addEditQuestionModal/addEditQuestionModal';
import ConfirmModal from '@/components/templates/confirm-modal/confirm-modal';

// Utils
import permissions from '@/utils/permission';

// Apis
import useGetQuestions from '@/apis/pAdmin/faqs/useGetQuestions';
import useDeleteQuestion from '@/apis/pAdmin/faqs/useDeleteQuestion';

function Faqs() {
   const [countValue, setCountValue] = useState(6);
   const [showAddEditQuestionModal, setShowAddEditQuestionModal] = useState(false);
   const [chosenQuestionForEdit, setChosenQuestionForEdit] = useState();
   const [chosenQuestionForDelete, setChosenQuestionForDelete] = useState();
   const [showDeleteModal, setShowDeleteModal] = useState(false);

   const userInfo = useSelector(state => state?.userInfoReducer);

   const { data: questionsList, isLoading: questionsIsLoading, mutate: questionsMutate } = useGetQuestions();
   const { trigger: deleteQuestionTrigger, isMutating: deleteQuestionIsMutating } = useDeleteQuestion();

   const closeAddEditQuestionModalHandler = () => {
      setShowAddEditQuestionModal(false);
      setChosenQuestionForEdit();
   };

   const closeDeleteQuestionModal = () => {
      setShowDeleteModal(false);
      setChosenQuestionForDelete();
   };

   const deleteQuestionHandler = () => {
      deleteQuestionTrigger(chosenQuestionForDelete.id, {
         onSuccess: () => {
            questionsMutate();
            closeDeleteQuestionModal();
         },
      });
   };

   const columns = [
      { id: 1, title: 'ردیف', key: 'index' },
      { id: 2, title: 'سوال', key: 'question' },
      {
         id: 3,
         title: 'عملیات',
         key: 'actions',
         renderCell: data => (
            <div className="flex items-center justify-center gap-2">
               <IconButton
                  size="small"
                  onClick={() => {
                     setChosenQuestionForEdit(data);
                     setShowAddEditQuestionModal(true);
                  }}
                  disabled={!userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.FAQS?.PATCH)}
               >
                  <BorderColorOutlinedIcon fontSize="inherit" />
               </IconButton>
               <IconButton
                  size="small"
                  onClick={() => {
                     setShowDeleteModal(true);
                     setChosenQuestionForDelete(data);
                  }}
                  disabled={!userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.FAQS?.DELETE)}
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
            <title>یاسی - پنل ادمین</title>
         </Head>

         <div className="w-full bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
               <div className="flex items-center gap-1.5">
                  <QuizOutlinedIcon color="textColor" fontSize="small" />
                  <p className="font-bold">لیست سوالات</p>
               </div>

               <Button
                  startIcon={<AddCircleOutlinedIcon />}
                  color="customPinkHigh"
                  onClick={() => setShowAddEditQuestionModal(true)}
                  disabled={!userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.FAQS?.POST)}
               >
                  افزودن سوال
               </Button>
            </div>

            <div className="mx-auto mt-6 w-full">
               <Table
                  columns={columns}
                  rows={questionsList}
                  loading={questionsIsLoading}
                  countValue={countValue}
                  setCountValue={setCountValue}
               />
            </div>
         </div>

         <AddEditQuestionModal
            show={showAddEditQuestionModal}
            onClose={closeAddEditQuestionModalHandler}
            isEdit={!!chosenQuestionForEdit}
            detail={chosenQuestionForEdit}
            questionsMutate={questionsMutate}
         />

         <ConfirmModal
            open={showDeleteModal}
            closeModal={closeDeleteQuestionModal}
            title="آیا از حذف این کد تخفیف مطمئن هستید ؟"
            confirmHandler={deleteQuestionHandler}
            confirmLoading={deleteQuestionIsMutating}
         />
      </AdminLayout>
   );
}

export default Faqs;

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
