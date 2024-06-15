import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// MUI
import { Backdrop } from '@mui/material';

// Styles
import LoadingComponentStyle from './loading-component.style';

function LoadingComponent() {
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   useEffect(() => {
      router.events.on('routeChangeStart', url => url !== router.asPath && setLoading(true));
      router.events.on('routeChangeComplete', url => url !== router.asPath && setLoading(false));
      router.events.on('routeChangeError', url => url !== router.asPath && setLoading(false));

      return () => {
         router.events.off('routeChangeStart', url => url !== router.asPath && setLoading(true));
         router.events.off('routeChangeComplete', url => url !== router.asPath && setLoading(false));
         router.events.off('routeChangeError', url => url !== router.asPath && setLoading(false));
      };
   });

   return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
         <LoadingComponentStyle>
            <div id="spinner">
               <div />
               <div />
            </div>
         </LoadingComponentStyle>
      </Backdrop>
   );
}

export default LoadingComponent;
