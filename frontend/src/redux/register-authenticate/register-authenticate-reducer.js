import { createReducer } from '@reduxjs/toolkit';
import { registerAuthenticateAction, resetRegisterAuthenticateAction } from './reigster-authenticate-action';

const initialState = {
  isRegisterAuthenticateLoading: false,
  isRegisterAuthenticateDone: false,
  registerAuthenticateError: '',
}

const registerAuthenticateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(registerAuthenticateAction.fulfilled, (state, action) => {
      state.isRegisterAuthenticateDone = true;
      state.isRegisterAuthenticateLoading = false;
      state.registerAuthenticateError = '';
    })
    .addCase(registerAuthenticateAction.pending, (state, action) => {
      state.isRegisterAuthenticateLoading = true;
      state.isRegisterAuthenticateDone = false;
    })
    .addCase(registerAuthenticateAction.rejected, (state, action) => {
      state.registerAuthenticateError = action.error.message;
      state.isRegisterAuthenticateLoading = false;
      state.isRegisterAuthenticateDone = false;
    })
    .addCase(resetRegisterAuthenticateAction, (state, action) => {
      state.registerAuthenticateError = '';
      state.isRegisterAuthenticateLoading = false;
      state.isRegisterAuthenticateDone = false;
    })
});

export default registerAuthenticateReducer;