import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const isLogin = Boolean(Cookies.get('yasi_isLogin'));

const loginStatusReducer = createSlice({
   name: 'loginStatusReducer',

   initialState: isLogin || false,

   reducers: {
      changeToLoginTrue: () => true,

      changeToLoginFalse: () => false,

      toggleLoginStatus: state => {
         if (state) {
            return false;
         }
         return true;
      },
   },
});

export const { changeToLoginTrue, changeToLoginFalse, toggleLoginStatus } = loginStatusReducer.actions;
export default loginStatusReducer.reducer;
