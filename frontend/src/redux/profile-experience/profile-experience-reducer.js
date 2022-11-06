import { createReducer } from "@reduxjs/toolkit";
import { 
  addProfileExperienceAction,
  removeProfileExperienceAction,
  resetProfileExperienceAction 
} from "./profile-experience-action";

const initialState = {
  isProfileExperienceLoading: false,
  profileExperienceError: '',
  isProfileExperienceDone: false,
}

const profileExperienceReducer = createReducer(initialState, (builder) => {
  builder 
    .addCase(addProfileExperienceAction.fulfilled, (state, action) => {
      state.isProfileExperienceLoading = false;
      state.isProfileExperienceDone = true;
    })
    .addCase(addProfileExperienceAction.pending, (state, action) => {
      state.isProfileExperienceLoading = true;
    })
    .addCase(addProfileExperienceAction.rejected, (state, action) => {
      state.isProfileExperienceLoading = false;
      state.isProfileExperienceDone = false;
      state.profileExperienceError = action.error.message;
    })
    .addCase(removeProfileExperienceAction.fulfilled, (state, action) => {
      state.isProfileExperienceLoading = false;
      state.isProfileExperienceDone = true;
    })
    .addCase(removeProfileExperienceAction.pending, (state, action) => {
      state.isProfileExperienceLoading = true;
    })
    .addCase(removeProfileExperienceAction.rejected, (state, action) => {
      state.isProfileExperienceLoading = false;
      state.isProfileExperienceDone = false;
      state.profileExperienceError = action.error.message;
    })
    .addCase(resetProfileExperienceAction, (state, action) => {
      state.isProfileExperienceDone = false;
      state.isProfileExperienceLoading = false;
      state.profileExperienceError = '';
    })
});

export default profileExperienceReducer;