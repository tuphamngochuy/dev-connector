import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import Utils from "../../utils";

const GET_ALL_PROFILE = 'data/all/profile/get';
const RESET_ALL_PROFILE = 'data/all/profile/reset';

export const getAllProfileAction = createAsyncThunk(
  GET_ALL_PROFILE, 
  async () => {
    const getAllProfileUrl = Utils.baseUrl + '/profile';
    try {
      const response = await axios.get(getAllProfileUrl);

      return response.data;
    } catch (err) {
      throw err.response.status;
    }
  }
);

export const resetAllProfileAction = createAction(RESET_ALL_PROFILE);