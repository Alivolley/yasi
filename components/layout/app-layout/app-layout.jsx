import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';

// MUI
import { ThemeProvider, createTheme } from '@mui/material';

// Redux
import { Provider } from 'react-redux';
import store from '@/store/store';

// Components
import LoadingComponent from '@/components/templates/loading-component/loading-component';
import RtlProvider from '../rtlProvider/rtlProvider';
import Header from '../header/header';
import Footer from '../footer/footer';

// Styles
import getDesignTokens from '@/configs/theme';
import 'react-toastify/dist/ReactToastify.css';

function AppLayout({ children }) {
   const themeConfig = createTheme(getDesignTokens());
   const { pathname } = useRouter();

   return (
      <Provider store={store}>
         <ThemeProvider theme={themeConfig}>
            <ToastContainer />
            <LoadingComponent />
            <RtlProvider>
               {pathname !== '/login' && !pathname.startsWith('/adminPanel') && <Header />}
               <main>{children}</main>
               {pathname !== '/login' && !pathname.startsWith('/adminPanel') && <Footer />}
            </RtlProvider>
         </ThemeProvider>
      </Provider>
   );
}

export default AppLayout;
