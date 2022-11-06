import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Utils from "../../utils";

const GET_ID_PROFILE = 'data/profile/id/get';
const RESET_ID_PROFILE = 'data/profile/id/reset';

export const getIdProfileAction = createAsyncThunk(
  GET_ID_PROFILE, 
  async ({ profile_id }) => {
    
    const getIdProfileUrl = Utils.baseUrl + '/profile/user?user_id=' + profile_id;

    try {
      const response = await axios.get(getIdProfileUrl);

      return response.data
    } catch (err) {
      throw err.response.status;
    }
  }
);

export const resetIdProfileAction = createAction(RESET_ID_PROFILE)