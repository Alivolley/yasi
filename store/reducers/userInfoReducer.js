import { createSlice } from '@reduxjs/toolkit';

const userInfoReducer = createSlice({
   name: 'userInfoReducer',
   initialState: {},
   reducers: {
      addUserInfo: (state, action) => action.payload,
   },
});

export const { addUserInfo } = userInfoReducer.actions;
export default userInfoReducer.reducer;
