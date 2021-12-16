import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';
// import navigationSlice from './navigationSlice';
import whrllAPI from '../api/whrrlAPI';

const persistConfig = {
  key: 'root',
  version: 1.121,
  storage
};

const rootReducer = combineReducers({
  userState: userReducer,
  //   navigationState: navigationSlice,
  [whrllAPI.reducerPath]: whrllAPI.reducer
});

export default persistReducer(persistConfig, rootReducer);
