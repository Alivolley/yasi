import { configureStore } from '@reduxjs/toolkit';
import loginStatusReducer from './reducers/loginStatusReducer';
import userInfoReducer from './reducers/userInfoReducer';
import pAdminSideBarStatus from './reducers/pAdminSideBarStatus';

const store = configureStore({
   reducer: {
      loginStatusReducer,
      userInfoReducer,
      pAdminSideBarStatus,
   },
});

export default store;
