import { configureStore } from '@reduxjs/toolkit'
import baseApi from './Feature/Api/BaseApi';
import UserSlice from './Feature/ManageUserSlice/UserSlice';
import RegisterStape from './Feature/ManageUserSlice/RegisterStape';
import BgVideoSoundSlice from './Feature/BgVideoSoundSlice/BgVideoSoundSlice';
import MotivatedTextSlice from './Feature/MotivatedTextSlice/MotivatedTextSlice';

const store = configureStore({
  reducer: {
    user : UserSlice,
    motivationText : MotivatedTextSlice,
    currentBgSound : BgVideoSoundSlice,
    registerStape : RegisterStape,
    [baseApi.reducerPath] : baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(baseApi.middleware),
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;