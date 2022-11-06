import { configureStore } from '@reduxjs/toolkit';

import registerAuthenticateReducer from './register-authenticate/register-authenticate-reducer';
import loginAuthenticateReducer from './login-authenticate/login-authenticate-reducer';
import navbarAuthenticateReducer from './navbar-authenticate/navbar-authenticate-reducer';
import loggedInProfileReducer from './logged-in-profile/logged-in-profile-reducer';
import profileExperienceReducer from './profile-experience/profile-experience-reducer';
import profileEducationReducer from './profile-education/profile-education-reducer';
import alertReducer from './alert/alert-reducer';
import allProfileReducer from './all-profile/all-profile-reducer';
import idProfileReducer from './id-profile/id-profile-reducer';

const globalStore = configureStore({
  reducer: {
    //Alert
    alertReducer: alertReducer,

    //Authenticate
    registerAuthenticateReducer: registerAuthenticateReducer,
    loginAuthenticateReducer: loginAuthenticateReducer,
    navbarAuthenticateReducer: navbarAuthenticateReducer,

    //Profile
    loggedInProfileReducer: loggedInProfileReducer,
    profileExperienceReducer: profileExperienceReducer,
    profileEducationReducer: profileEducationReducer,
    allProfileReducer: allProfileReducer,
    idProfileReducer: idProfileReducer,
  }
});

export default globalStore;