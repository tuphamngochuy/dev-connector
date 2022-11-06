import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Utils from "../../utils";

const ADD_EDUCATION = 'profile/education/add';
const REMOVE_EDUCATION = 'profile/education/remove';
const RESET_EDUCATION = 'profile/education/reset';

export const addProfileEducationAction = createAsyncThunk(
  ADD_EDUCATION,
  async ({
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current = false,
    description
  }) => {
    try {
      const response = await axios.put(
        `${Utils.baseUrl}/profile/education`, {
          school: school,
          degree: degree,
          fieldofstudy: fieldofstudy,
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

export const removeProfileEducationAction = createAsyncThunk(
  REMOVE_EDUCATION,
  async ({ edu_id }) => {
    try {
      await axios.delete(
        `${ Utils.baseUrl }/profile/education?edu_id=${ edu_id }`, {
          headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + localStorage.getItem('token')
          }
        }
      );
    } catch (err) {
      throw err.response.status;
    }
  }
);

export const resetProfileEducationAction = createAction(RESET_EDUCATION);