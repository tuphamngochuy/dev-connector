import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Login from './components/authentication/login';
import Register from './components/authentication/register';
import Landing from './components/layout/landing';
import Navbar from './components/layout/navbar';
import globalStore from './redux/global-store';
import Dashboard from './components/dashboard/dashboard';
import PrivateRoute from './components/authentication/private-route';
import CreateProfile from './components/dashboard/create-profile';
import AddExperience from './components/dashboard/add-experience';
import AddEducation from './components/dashboard/add-education';
import Profiles from './components/layout/profiles';
import Profile from './components/layout/profile';

const App = () => {
  return <Provider store={ globalStore }>
    <BrowserRouter>
    <Fragment>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Landing />} />
      </Routes>
      <section className='container'>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/dashboard' element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route exact path='/create-profile' element={
            <PrivateRoute>
              <CreateProfile />
            </PrivateRoute>
          } />
          <Route exact path='/add-education' element={
            <PrivateRoute>
              <AddEducation />
            </PrivateRoute>
          } />
          <Route exact path='/add-experience' element={
            <PrivateRoute>
              <AddExperience />
            </PrivateRoute>
          } />
          <Route exact path='/profiles' element={ <Profiles /> } />
          <Route path='/profile/:profile_id' element={ <Profile /> } />
        </Routes>
      </section>
    </Fragment>
    </BrowserRouter>
  </Provider>
}

export default App;
