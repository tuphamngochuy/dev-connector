import { createReducer } from "@reduxjs/toolkit";
import { getAllProfileAction, resetAllProfileAction } from "./all-profile-action";

const initialState = {
  isAllProfileLoading: false,
  isAllProfileDone: false,
  allProfileData: '',
  allProfileError: ''
}

const allProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllProfileAction.fulfilled, (state, action) => {
      console.log("---full", action);
      state.allProfileData = action.payload;
      state.isAllProfileLoading = false;
      state.isAllProfileDone = true;
    })
    .addCase(getAllProfileAction.pending, (state, action) => {
      state.isAllProfileLoading = false;
    })
    .addCase(getAllProfileAction.rejected, (state, action) => {
      state.isAllProfileDone = false;
      state.isAllProfileLoading = false;
      state.allProfileError = action.error.message;
    })
    .addCase(resetAllProfileAction, (state, action) => {
      state.isAllProfileDone = false;
      state.isAllProfileLoading = false;
      state.allProfileData = '';
      state.allProfileError = '';
    })
});

export default allProfileReducer;