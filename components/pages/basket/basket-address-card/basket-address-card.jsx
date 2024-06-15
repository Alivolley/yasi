/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';

// MUI
import { IconButton } from '@mui/material';

// Icons
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';

// Components
import BasketAddressModal from '../basket-address-modal/basket-address-modal';
import BasketDeleteAddressModal from '../basket-delete-address-modal/basket-delete-address-modal';

function BasketAddressCard({ isClickable = false, detail, onClick = () => {}, isActive = false, usersMutate }) {
   const [showBasketAddressModal, setShowBasketAddressModal] = useState(false);
   const [showDeleteAddressModal, setShowDeleteAddressModal] = useState(false);

   return (
      <div className="flex items-center justify-between rounded-2xl bg-white p-4 customMd:px-8">
         <div className="cursor-pointer" onClick={onClick}>
            <div
               className={`flex items-center gap-2 text-base customMd:text-lg ${
                  isActive ? 'font-bold' : 'text-textColor'
               }`}
            >
               {isClickable && (
                  <div
                     className={`size-4 rounded-full border-4 border-solid ${
                        isActive ? 'border-[#D14D72]' : 'border-borderColor'
                     }`}
                  />
               )}
               {detail?.recipient_name}
            </div>
            <p className={`text-xs customMd:text-sm ${isActive ? '' : 'text-textColor'}`}>
               {detail?.address} - {detail?.phone_number}
            </p>
         </div>

         <div className="flex items-center">
            <IconButton onClick={() => setShowBasketAddressModal(true)}>
               <BorderColorRoundedIcon color="customBlue" className="!text-base" />
            </IconButton>
            <IconButton onClick={() => setShowDeleteAddressModal(true)}>
               <DeleteOutlineIcon className="!text-xl" color="customPinkHigh" />
            </IconButton>
         </div>

         <BasketAddressModal
            show={showBasketAddressModal}
            onClose={() => setShowBasketAddressModal(false)}
            isEdit
            detail={detail}
            usersMutate={usersMutate}
         />
         <BasketDeleteAddressModal
            show={showDeleteAddressModal}
            onClose={() => setShowDeleteAddressModal(false)}
            detail={detail}
            usersMutate={usersMutate}
         />
      </div>
   );
}

export default BasketAddressCard;
