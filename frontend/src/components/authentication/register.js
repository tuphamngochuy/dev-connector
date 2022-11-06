import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Alert from '../layout/alert';
import { setAlertAction, removeAlertAction } from '../../redux/alert/alert-action';
import { registerAuthenticateAction, resetRegisterAuthenticateAction } from '../../redux/register-authenticate/reigster-authenticate-action';

const Register = () => {
  //alert reducer
  const { message } = useSelector(state => state.alertReducer);
  //register authenticate reducer
  const { 
    isRegisterAuthenticateLoading,
    registerAuthenticateError,
    isRegisterAuthenticateDone 
  } = useSelector(state => state.registerAuthenticateReducer);

  const dispatcher = useDispatch();

  const navigator = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = registerData;

  /**
   * Handle show error after authenticate
   */
  useEffect(() => {
    if (registerAuthenticateError === '') {
      dispatcher(removeAlertAction());
    } else {
      dispatcher(setAlertAction(registerAuthenticateError));
    }
  }, [registerAuthenticateError]);

  /**
   * Triggered everywhen typing in input form
   * @param { Event } e 
   */
  const inputChangeHandler = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  }

  /**
   * Auto navigate to login and reset state of register page
   */
  useEffect(() => {
    if (isRegisterAuthenticateDone) navigator('/login');
    dispatcher(resetRegisterAuthenticateAction());
  }, [isRegisterAuthenticateDone]);

  useEffect(() => {
    if (localStorage.getItem('token') !== '') {
      navigator('/dashboard');
    }
  }, []);

  /**
   * Triggered when click the register button
   * @param { Event } e 
   */
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatcher(setAlertAction('Your passwords are not match to each other'));
    } else {
      dispatcher(removeAlertAction());
      dispatcher(registerAuthenticateAction({ name, email, password}));
    }
  }

  return <Fragment>
    <section className={`${ isRegisterAuthenticateLoading ? 'loaded-page ' : '' } section-container`}>
      <div className={ isRegisterAuthenticateLoading ? 'loader' : '' }></div>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        Create Your Account
      </p>
      <Alert message={ message } />
      <form className="form" onSubmit={ submitHandler }>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={ name }
            onChange={ inputChangeHandler }
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={ email }
            onChange={ inputChangeHandler }
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={ password }
            onChange={ inputChangeHandler }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={ password2 }
            onChange={ inputChangeHandler }
          />
        </div>
        <input 
          type="submit"
          className="btn btn-primary" 
          value="Register" 
        />
      </form>
      <p className="my-1">
        Already have an account? 
        <Link to='/login'>Sign In</Link>
      </p>
    </section>
  </Fragment>
}

export default Register;
