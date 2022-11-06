import { createAction } from "@reduxjs/toolkit";

const SET_ALERT = 'alert/set';
const REMOVE_ALERT = 'alert/remove';

export const setAlertAction = createAction(SET_ALERT);
export const removeAlertAction = createAction(REMOVE_ALERT);