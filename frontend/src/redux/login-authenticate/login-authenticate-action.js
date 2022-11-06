import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Utils from '../../utils';

const LOGIN = 'authenticate/login';
const LOGOUT = 'authenticate/logout';

export const loginAuthenticateAction = createAsyncThunk(
  LOGIN,
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${Utils.baseUrl}/auth`, {
          email: email,
          password: password
          }
        );
  
        return response.data;
    } catch (err) {
      throw err.response.status;
    }
  }
);

export const logoutAuthenticateAction = createAction(LOGOUT);