import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { searchApi } from './api/search';
import homeReducer from './slices/home';


export const store = configureStore({
  reducer: {
    HOME: homeReducer,
    [searchApi.reducerPath]: searchApi.reducer,
   
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(
    searchApi.middleware,
  ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;