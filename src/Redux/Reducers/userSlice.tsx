import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userState {
  user_data: any;
  path:any;
}
const initialState: userState = {
  user_data: {},
  path:{},
};
const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    storeuser(state:any, action: PayloadAction<userState>) {
      state.user_data = action.payload;
    },
    path(state:any, action: PayloadAction<userState>) {
      state.path = action.payload;
    },
    clear(state:any) {
      state.user_data = undefined,
      state.path = undefined;
    },
  },
});

export const {storeuser,path, clear} = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
