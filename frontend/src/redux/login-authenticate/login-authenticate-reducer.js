import { createReducer } from '@reduxjs/toolkit';
import { loginAuthenticateAction, logoutAuthenticateAction } from './login-authenticate-action';

const initialState = {
  isLoginAuthenticateLoading: false,
  loginAuthenticateError: '', 
}

const loginAuthenticateReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginAuthenticateAction.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = true;
      state.loginAuthenticateError = '';
      state.isLoginAuthenticateLoading = false;
    })
    .addCase(loginAuthenticateAction.pending, (state, action) => {
      state.isLoginAuthenticateLoading = true;
    })
    .addCase(loginAuthenticateAction.rejected, (state, action) => {
      state.loginAuthenticateError = action.error.message;
      state.isLoginAuthenticateLoading = false;
    })
    .addCase(logoutAuthenticateAction, (state, action) => {
      state.loginAuthenticateError = '';
      state.isLoginAuthenticateLoading = false;
      localStorage.setItem('token', '');
    })
});

export default loginAuthenticateReducer;