import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileDrawerOpen: false,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleMobileDrawer: state => {
      state.mobileDrawerOpen = !state.mobileDrawerOpen;
    },
  }
});

export const { toggleMobileDrawer, toogleMiniDrawer, setMiniDrawer } = navigationSlice.actions;

export default navigationSlice.reducer;
