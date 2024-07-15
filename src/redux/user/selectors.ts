import { RootState } from "../store";

export const selectUserData = (state: RootState) => state.user.user;
export const selectLoadingState = (state: RootState) => state.user.loading;
export const selectErrorCode = (state: RootState) => state.user.errorCode;
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
