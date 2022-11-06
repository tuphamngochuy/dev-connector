import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import Utils from "../../utils";

const REGISTER = 'authenticate/register';

const RESET_REGISTER = 'authenticate/register/reset';

export const registerAuthenticateAction = createAsyncThunk(
  REGISTER,
  async ({ name, email, password }) => {
    try {
      const response = await axios.post(`${Utils.baseUrl}/users`, {
        name: name,
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

export const resetRegisterAuthenticateAction = createAction(RESET_REGISTER);