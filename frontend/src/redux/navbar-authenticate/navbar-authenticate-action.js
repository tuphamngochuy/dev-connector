import { createAction } from "@reduxjs/toolkit";

const SET_AUTH_NAVBAR = 'auth/navbar/auth';
const SET_GUEST_NAVBAR = 'auth/navbar/guest';

export const setAuthNavbarAction = createAction(SET_AUTH_NAVBAR);

export const setGuestNavbarAction = createAction(SET_GUEST_NAVBAR);