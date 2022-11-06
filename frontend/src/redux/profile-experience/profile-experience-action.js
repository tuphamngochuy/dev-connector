import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Utils from "../../utils";

const ADD_EXPERIENCE = 'profile/experience/add';
const REMOVE_EXPERIENCE = 'profile/experience/remove';
const RESET_EXPERIENCE = 'profile/experience/reset';

export const addProfileExperienceAction = createAsyncThunk(
  ADD_EXPERIENCE,
  async ({
    title,
    company,
    location,
    from,
    to,
    current = false,
    description
  }) => {
    try {
      const response = await axios.put(
        `${Utils.baseUrl}/profile/experience`, {
          title: title,
          company: company,
          location: location,
          from: from,
          to: to,
          current: current,
          description: description
        }, {
          headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + localStorage.getItem('token')
          }
        }
      );

      return response.data;
    } catch (err) {
      throw err.response.status;
    }
  }
);

export const removeProfileExperienceAction = createAsyncThunk(
  REMOVE_EXPERIENCE,
  async ({ exp_id }) => {
    try {
      await axios.delete(
        `${Utils.baseUrl}/profile/experience?exp_id=${ exp_id }`, {
          headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + localStorage.getItem('token')
          }
        }
      );
    } catch (err) {
      throw err.message;
    }
  }
);

export const resetProfileExperienceAction = createAction(RESET_EXPERIENCE);