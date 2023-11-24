import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface userState {
  user_data: any;
}
const initialState: userState = {
  user_data: {},
};
const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    storeuser(state:any, action: PayloadAction<userState>) {
      state.user_data = action.payload;
    },
    clear(state:any) {
      state.user_data = undefined;
    },
  },
});

export const {storeuser, clear} = userSlice.actions;
const userReducer = userSlice.reducer;

export default userReducer;
