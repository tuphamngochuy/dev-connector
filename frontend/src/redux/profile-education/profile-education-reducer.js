import { createReducer } from "@reduxjs/toolkit";
import { addProfileEducationAction, removeProfileEducationAction, resetProfileEducationAction } from "./profile-education-action";

const initialState = {
  isProfileEducationLoading: false,
  profileEducationError: '',
  isProfileEducationDone: false
}

const profileEducationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addProfileEducationAction.fulfilled, (state, action) => {
      state.isProfileEducationDone = true;
      state.isProfileEducationLoading = false;
      state.profileEducationError = '';
    })
    .addCase(addProfileEducationAction.pending, (state, action) => {
      state.isProfileEducationLoading = true;
    })
    .addCase(addProfileEducationAction.rejected, (state, action) => {
      state.isProfileEducationLoading = false;
      state.isProfileEducationDone = false;
      state.profileEducationError = action.error.message;
    })
    .addCase(removeProfileEducationAction.fulfilled, (state, action) => {
      state.isProfileEducationDone = true;
      state.isProfileEducationLoading = false;
      state.profileEducationError = '';
    })
    .addCase(removeProfileEducationAction.pending, (state, action) => {
      state.isProfileEducationLoading = true;
    })
    .addCase(removeProfileEducationAction.rejected, (state, action) => {
      state.isProfileEducationDone = false;
      state.isProfileEducationLoading = false;
      state.profileEducationError = '';
    })
    .addCase(resetProfileEducationAction, (state, action) => {
      state.isProfileEducationDone = false;
      state.isProfileEducationLoading = false;
      state.profileEducationError = '';
    })
});

export default profileEducationReducer;