import { createReducer } from "@reduxjs/toolkit";
import { setAuthNavbarAction, setGuestNavbarAction } from "./navbar-authenticate-action";

const initialState = {
  routeList: []
};

const navbarAuthenticateReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setGuestNavbarAction, (state, action) => {
        state.routeList.length = 0;
        action.payload.forEach(route => {
          state.routeList.push(route);
        });
      })
      .addCase(setAuthNavbarAction, (state, action) => {
        state.routeList = ['profiles', 'dashboard', 'logout']
      })
  }
);

export default navbarAuthenticateReducer;