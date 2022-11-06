import { createReducer } from "@reduxjs/toolkit"
import { act } from "react-dom/test-utils";
import { getIdProfileAction, resetIdProfileAction } from "./id-profile-action"

const initialState = {
  isIdProfileDone: false,
  isIdProfileLoading: false,
  idProfileData: '',
  idProfileError: ''
};

const idProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getIdProfileAction.fulfilled, (state, action) => {
      console.log("---fulfilled", action);
      state.idProfileData = action.payload;
      state.isIdProfileDone = true;
      state.isIdProfileLoading = false;
    })
    .addCase(getIdProfileAction.pending, (state, action) => {
      console.log("---pending", action);
      state.isIdProfileDone = true;
    })
    .addCase(getIdProfileAction.rejected, (state, action) => {
      console.log('---rejected', action);
      state.isIdProfileDone = false;
      state.isIdProfileLoading = false;
      state.idProfileError = action.error.message;
    })
    .addCase(resetIdProfileAction, (state, action) => {
      state.isIdProfileDone = false;
      state.isIdProfileLoading = false;
      state.idProfileError = '';
      state.idProfileData = '';
    })
});

export default idProfileReducer;