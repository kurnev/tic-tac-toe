import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { fieldSlice } from "../containers/field/fieldSlice";

export const store = configureStore({
  reducer: {
    field: fieldSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
