import { createReducer } from "@reduxjs/toolkit";
import { removeAlertAction, setAlertAction } from "./alert-action";

const initialState = {
  message: ''
}

const alertReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setAlertAction, (state, action) => {
      state.message = translateAlert(action.payload)
    })
    .addCase(removeAlertAction, (state, action) => {
      state.message = ''
    })
});

const translateAlert = (value) => {
  if (value.includes('401')) {
    return 'Wrong email or password';
  } else if (value.includes('303')) {
    return 'This email has been already used';
  }

  return value;
}

export default alertReducer;