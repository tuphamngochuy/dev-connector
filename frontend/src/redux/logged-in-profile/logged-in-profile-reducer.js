import { createReducer } from "@reduxjs/toolkit";
import { setLoggedInProfile, getLoggedInProfile, resetLoggedInProfile } from "./logged-in-profile-action";

const initialState = {
  loggedInProfileData: '',
  isLoggedInProfileLoading: false,
  isLoggedInProfileDone: false
}

//TODO: Complete the reducer
const loggedInProfileReducer = createReducer(initialState, (builder) =>{
  builder
    .addCase(setLoggedInProfile.fulfilled, (state, action) => {
      state.isLoggedInProfileLoading = false;
      state.loggedInProfileData = JSON.stringify(action.payload);
      state.isLoggedInProfileDone = true;
    })
    .addCase(setLoggedInProfile.pending, (state, action) => {
      state.isLoggedInProfileLoading = true;
      state.isLoggedInProfileDone = false;
    })
    .addCase(setLoggedInProfile.rejected, (state, action) => {
      state.isLoggedInProfileLoading = false;
      state.loggedInProfileData = '';
      state.isLoggedInProfileDone = false;
    })
    .addCase(getLoggedInProfile.fulfilled, (state, action) => {
      state.isLoggedInProfileLoading = false;
      state.loggedInProfileData = JSON.stringify(action.payload);
      state.isLoggedInProfileDone = true;
    })
    .addCase(getLoggedInProfile.pending, (state, action) => {
      state.isLoggedInProfileLoading = true;
      state.isLoggedInProfileDone = false;
    })
    .addCase(getLoggedInProfile.rejected, (state, action) => {
      state.isLoggedInProfileLoading = false;
      state.loggedInProfileData = '';
      state.isLoggedInProfileDone = false;
    })
    .addCase(resetLoggedInProfile, (state, action) => {
      state.isLoggedInProfileLoading = false;
      state.isLoggedInProfileDone = false;
    })
});

export default loggedInProfileReducer;