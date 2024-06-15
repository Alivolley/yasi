import { useState } from 'react';
import Image from 'next/image';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { IconButton, Rating } from '@mui/material';

// Icons
import QuickreplyOutlinedIcon from '@mui/icons-material/QuickreplyOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// Assets
import userProfilePic from '@/assets/images/userProfile.png';

// Components
import ConfirmModal from '@/components/templates/confirm-modal/confirm-modal';
import ReplyModal from '../reply-modal/reply-modal';

// Apis
import useDeleteComment from '@/apis/comments/useDeleteComment';

// Utils
import permissions from '@/utils/permission';

function Comment({ detail, commentsMutate }) {
   const [showReplyModal, setShowReplyModal] = useState(false);
   const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
   const userInfo = useSelector(state => state?.userInfoReducer);

   const { trigger: deleteCommentTrigger, isMutating: deleteCommentIsMutating } = useDeleteComment();

   const deleteCommentHandler = () => {
      deleteCommentTrigger(detail?.id, {
         onSuccess: () => {
            setShowDeleteCommentModal(false);
            commentsMutate();
         },
      });
   };

   return (
      <div className="border-b border-solid border-[#E4EAF0] pb-8">
         <div>
            <div className="flex items-start justify-between">
               <div className="flex gap-2">
                  <div className="relative size-10 shrink-0 rounded-full border border-solid border-gray-400 customMd:size-14">
                     <Image
                        src={detail?.user_image || userProfilePic}
                        className="rounded-full"
                        alt="user profile"
                        fill
                     />
                  </div>
                  <div className="flex flex-col gap-1">
                     <div className="flex flex-wrap items-center gap-2 customSm:flex-nowrap">
                        <p className="mb-1 font-bold">{detail?.user}</p>
                        <p className="text-10 text-textColor">{detail?.elapsed_time}</p>
                     </div>
                     <div>
                        <Rating value={Number(detail?.score)} max={Number(detail?.score)} size="small" readOnly />
                     </div>
                     <pre className="whitespace-normal text-sm text-textColor customMd:text-base">
                        {detail?.message}
                     </pre>
                  </div>
               </div>

               {userInfo?.is_admin && (
                  <div className="flex items-center gap-1">
                     <IconButton
                        color="customPinkHigh"
                        onClick={() => setShowReplyModal(true)}
                        disabled={
                           !userInfo?.is_super_admin &&
                           !userInfo?.permissions?.includes(permissions?.REPLY_ON_COMMENT?.PATCH)
                        }
                     >
                        <QuickreplyOutlinedIcon className="!text-base" />
                     </IconButton>
                     <IconButton
                        color="customPinkHigh"
                        onClick={() => setShowDeleteCommentModal(true)}
                        disabled={
                           !userInfo?.is_super_admin &&
                           !userInfo?.permissions?.includes(permissions?.DELETE_COMMENT?.DELETE)
                        }
                     >
                        <DeleteOutlineIcon className="!text-lg" />
                     </IconButton>
                  </div>
               )}
            </div>
         </div>
         {detail?.reply_message && (
            <div className="mr-5 mt-6 rounded-10 bg-[#FCF7F7] p-2 text-white customXs:mr-16 customSm:p-5 customMd:mr-24">
               <div className="flex gap-3">
                  <div className="relative size-10 shrink-0 rounded-full border border-solid border-gray-400 customMd:size-14">
                     <Image
                        src={detail?.admin_image || userProfilePic}
                        className="rounded-full"
                        alt="admin profile"
                        fill
                     />
                  </div>
                  <div>
                     <div className="flex flex-wrap items-center gap-2 text-textColor customSm:flex-nowrap">
                        <p className="whitespace-nowrap text-sm font-bold">پاسخ یاسی</p>
                        <p className="text-10">{detail?.reply_elapsed_time}</p>
                     </div>
                     <pre className="mt-4 whitespace-normal text-sm text-textColor">{detail?.reply_message}</pre>
                  </div>
               </div>
            </div>
         )}

         <ConfirmModal
            open={showDeleteCommentModal}
            closeModal={() => setShowDeleteCommentModal(false)}
            title="آیا از حذف این کامنت مطمئن هستید ؟"
            confirmHandler={deleteCommentHandler}
            confirmLoading={deleteCommentIsMutating}
         />

         <ReplyModal
            open={showReplyModal}
            closeModal={() => setShowReplyModal(false)}
            detail={detail}
            commentsMutate={commentsMutate}
         />
      </div>
   );
}

export default Comment;
