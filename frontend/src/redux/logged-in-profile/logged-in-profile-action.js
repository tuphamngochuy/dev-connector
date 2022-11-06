import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Utils from '../../utils';

const SET_LOGGED_IN_PROFILE = 'auth/profile/get';
const GET_LOGGED_IN_PROFILE = 'auth/profile/set';
const RESET_LOGGED_IN_PROFILE = 'auth/profile/reset';

export const setLoggedInProfile = createAsyncThunk(
  SET_LOGGED_IN_PROFILE,
  async (profileData) => {
    try {
      const profileResponse = await axios.post(
        `${Utils.baseUrl}/profile`, {
          ...profileData
        }, {
          headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + localStorage.getItem('token')
          }
        }
      );

      const userResponse = await axios.get(
        `${Utils.baseUrl}/auth`, {
          headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + localStorage.getItem('token')
          }
        }
      );

      const responseData = {
        name: userResponse.data.name,
        experience: profileResponse.data.experience,
        education: profileResponse.data.education
      }

      return responseData;
    } catch (err) {
      throw err.response.status
    }
  }
);

export const getLoggedInProfile = createAsyncThunk(
  GET_LOGGED_IN_PROFILE,
  async () => {
    try {
      const profileResponse = await axios.get(
        `${Utils.baseUrl}/profile/me`, {
          headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + localStorage.getItem('token')
          }
        }
      );

      const userResponse = await axios.get(
        `${Utils.baseUrl}/auth`, {
          headers: {
            'content-type': 'application/json',
            'authorization': 'bearer ' + localStorage.getItem('token')
          }
        }
      );

      const responseData = {
        name: userResponse.data.name,
        experience: profileResponse.data.experience,
        education: profileResponse.data.education
      }

      return responseData;
    } catch (err) {
      throw err.response.status;
    }
  }
);

export const resetLoggedInProfile = createAction(RESET_LOGGED_IN_PROFILE);