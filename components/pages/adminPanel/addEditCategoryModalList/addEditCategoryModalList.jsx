import { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { Button, CircularProgress, Dialog, IconButton } from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

// Components
import ConfirmModal from '@/components/templates/confirm-modal/confirm-modal';
import AddEditCategoryModal from '../addEditCategoryModal/addEditCategoryModal';

// Apis
import useCategories from '@/apis/categories/useCategories';
import useDeleteCategory from '@/apis/pAdmin/categories/useDeleteCategory';

// Utils
import permissions from '@/utils/permission';

function AddEditCategoryModalList({ show, onClose }) {
   const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
   const [showAddEditModal, setShowAddEditModal] = useState(false);
   const [chosenCategoryForDelete, setChosenCategoryForDelete] = useState();
   const [chosenCategoryForEdit, setChosenCategoryForEdit] = useState();

   const userInfo = useSelector(state => state?.userInfoReducer);

   const { data: categoryList, isLoading: categoryIsLoading } = useCategories();
   const { trigger: deleteCategoryTrigger, isMutating: deleteCategoryIsMutating } = useDeleteCategory();

   const closeDeleteCategoryModalHandler = () => {
      setShowDeleteCategoryModal(false);
      setChosenCategoryForDelete();
   };

   const deleteCategoryHandler = () => {
      deleteCategoryTrigger(chosenCategoryForDelete, {
         onSuccess: () => closeDeleteCategoryModalHandler(),
      });
   };

   const closeAddEditModal = () => {
      setShowAddEditModal(false);
      setChosenCategoryForEdit();
   };

   return (
      <Dialog open={show} onClose={onClose} dir="rtl" fullWidth>
         <div className="relative p-5 pt-0">
            <div className="sticky top-0 z-[2] border-b border-solid border-[#E4EAF0] bg-white">
               <div className="flex items-center justify-between pt-3">
                  <p className="text-lg font-bold">مدیریت دسته بندی ها</p>
                  <IconButton onClick={onClose}>
                     <CloseIcon />
                  </IconButton>
               </div>
               <div className="my-4">
                  <Button
                     startIcon={<AddCircleOutlinedIcon />}
                     color="customPinkHigh"
                     onClick={() => setShowAddEditModal(true)}
                     disabled={
                        !userInfo?.is_super_admin && !userInfo?.permissions?.includes(permissions?.CATEGORY?.POST)
                     }
                  >
                     افزودن دسته بندی
                  </Button>
               </div>
            </div>

            {categoryIsLoading ? (
               <div className="mt-5 flex w-full items-center justify-center">
                  <CircularProgress color="customPink" />
               </div>
            ) : (
               <div>
                  {categoryList?.map((item, index) => (
                     <div
                        key={item?.id}
                        className="flex items-center justify-between gap-1 border-b border-solid border-[#E4EAF0] py-3 text-xs customSm:text-sm"
                     >
                        <p>
                           {index + 1}. {item?.title}
                        </p>
                        <div className="flex items-center gap-2">
                           <IconButton
                              size="small"
                              onClick={() => {
                                 setShowAddEditModal(true);
                                 setChosenCategoryForEdit(item?.id);
                              }}
                              disabled={
                                 !userInfo?.is_super_admin &&
                                 !userInfo?.permissions?.includes(permissions?.CATEGORY?.PATCH)
                              }
                           >
                              <BorderColorOutlinedIcon fontSize="inherit" />
                           </IconButton>
                           <IconButton
                              size="small"
                              onClick={() => {
                                 setShowDeleteCategoryModal(true);
                                 setChosenCategoryForDelete(item?.id);
                              }}
                              disabled={
                                 !userInfo?.is_super_admin &&
                                 !userInfo?.permissions?.includes(permissions?.CATEGORY?.DELETE)
                              }
                           >
                              <DeleteOutlineOutlinedIcon fontSize="small" />
                           </IconButton>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>

         <ConfirmModal
            open={showDeleteCategoryModal}
            closeModal={closeDeleteCategoryModalHandler}
            title={
               <span className="flex max-w-sm flex-col gap-5">
                  <span>آیا از حذف این دسته بندی مطمئن هستید ؟</span>
                  <span className="leading-[30px] text-customPinkHigh">
                     ! توجه داشته باشید که تمام محصولات مربوط به این دسته بندی نیز حذف خواهند شد !!
                  </span>
               </span>
            }
            confirmHandler={deleteCategoryHandler}
            confirmLoading={deleteCategoryIsMutating}
         />

         <AddEditCategoryModal
            show={showAddEditModal}
            onClose={closeAddEditModal}
            isEdit={!!chosenCategoryForEdit}
            detail={chosenCategoryForEdit}
         />
      </Dialog>
   );
}

export default AddEditCategoryModalList;
