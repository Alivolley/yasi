import { useState } from 'react';
import Link from 'next/link';

// MUI
import { Badge, Drawer, IconButton } from '@mui/material';

// Icons

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleStatus } from '@/store/reducers/pAdminSideBarStatus';

// Components
import AdminSideBar from '../admin-sideBar/admin-sideBar';

// Apis
import useGetUnreadTickets from '@/apis/pAdmin/tickets/useGetUnreadTickets';

function AdminLayout({ children }) {
   const [showMobileMenu, setShowMobileMenu] = useState(false);

   const isSideBarOpen = useSelector(state => state?.pAdminSideBarStatus);
   const { data: ticketsData } = useGetUnreadTickets();

   const dispatch = useDispatch();

   return (
      <div className="relative flex bg-[#f5f8fc]">
         <AdminSideBar />

         <Drawer anchor="left" open={showMobileMenu} onClose={() => setShowMobileMenu(false)}>
            <AdminSideBar isMobile onClose={() => setShowMobileMenu(false)} />
         </Drawer>

         <div className="w-full customMd:grow">
            <div className="sticky top-0 z-[2] flex w-full items-center justify-between bg-white px-8 py-4 customMd:px-16 customMd:py-8">
               <div className="hidden customMd:block">
                  <IconButton onClick={() => dispatch(toggleStatus())}>
                     {isSideBarOpen ? (
                        <MenuOutlinedIcon className="!text-3xl" />
                     ) : (
                        <MenuOpenOutlinedIcon className="!text-3xl" />
                     )}
                  </IconButton>
               </div>
               <div className="customMd:hidden">
                  <IconButton onClick={() => setShowMobileMenu(true)}>
                     <MenuOutlinedIcon className="!text-3xl" />
                  </IconButton>
               </div>
               <div className="flex items-center gap-4">
                  <Link href="/adminPanel/tickets">
                     <IconButton sx={{ backgroundColor: '#F5F8FC' }}>
                        <Badge
                           badgeContent={ticketsData?.length}
                           color="error"
                           anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                           }}
                           sx={{
                              '& .MuiBadge-badge': {
                                 fontSize: 10,
                                 width: 16,
                                 height: 16,
                                 minWidth: 16,
                              },
                           }}
                        >
                           <NotificationsNoneOutlinedIcon />
                        </Badge>
                     </IconButton>
                  </Link>

                  <Link href="/">
                     <IconButton sx={{ backgroundColor: '#F5F8FC' }}>
                        <HomeOutlinedIcon />
                     </IconButton>
                  </Link>
               </div>
            </div>
            <div className="w-full p-8">{children}</div>
         </div>
      </div>
   );
}

export default AdminLayout;
