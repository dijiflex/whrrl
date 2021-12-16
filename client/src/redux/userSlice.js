import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loggedIn: false,
  loginType: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: state => {
      state.currentUser = null;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setloginType: (state, action) => {
      state.loginType = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  }
});
export const getCurrentUser = state => state.user.currentUser;

// Action creators are generated for each case reducer function
export const { setUser, logoutUser, setLoggedIn, setloginType, setToken } = userSlice.actions;

export default userSlice.reducer;
