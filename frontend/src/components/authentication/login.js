import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { loginAuthenticateAction } from '../../redux/login-authenticate/login-authenticate-action';
import Alert from '../layout/alert';
import { setAlertAction, removeAlertAction } from '../../redux/alert/alert-action';
import { setAuthNavbarAction } from '../../redux/navbar-authenticate/navbar-authenticate-action';

const Login = () => {
  //loginAlertReducer reducer
  const { message } = useSelector(state => state.alertReducer);

  //loginAuthenticateReducer reducer
  const { 
    isLoginAuthenticateLoading,
    loginAuthenticateError 
  } = useSelector(state => state.loginAuthenticateReducer);

  const dispatcher = useDispatch();

  const navigator = useNavigate();

  /**
   * Reset notification
   */
  useEffect(() => {
    dispatcher(removeAlertAction())
  }, []);

  /**
   * Handle show error
   */
  useEffect(() => {
    if (loginAuthenticateError === '') {
      dispatcher(removeAlertAction());
    } else {
      dispatcher(setAlertAction(loginAuthenticateError))
    }
  }, [loginAuthenticateError]);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = loginData;

  /**
   * Handle auto navigate after login
   */
  useEffect(() => {
    if (localStorage.getItem('token') !== '') {
      navigator('/dashboard');
      dispatcher(setAuthNavbarAction())
    } 
  }, [localStorage.getItem('token')]);
  
  /**
   * Triggered whenever typing
   * @param { Event } e 
   */
  const changeInputHandler = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  }

  /**
   * Triggered when click login button
   * @param { Event } e 
   */
  const submitHandler = (e) => {
    e.preventDefault();
    dispatcher(loginAuthenticateAction({ email, password }));
  }

  return <Fragment>
    <section className={`${ isLoginAuthenticateLoading ? 'loaded-page ' : '' } section-container`}>
      <div className={ isLoginAuthenticateLoading ? 'loader' : '' }></div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        Sign into Your Account
      </p>
      <Alert message={ message } />
      <form className="form" onSubmit={ submitHandler }>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={ email }
            onChange={ changeInputHandler }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={ password }
            onChange={ changeInputHandler }
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary"
          value="Login"
        />
      </form>
      <p className="my-1">
        Don't have an account?
        <Link to='/register'>Sign Up</Link>
      </p>
    </section>
  </Fragment>
}

export default Login;