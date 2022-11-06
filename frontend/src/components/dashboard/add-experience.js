import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Alert from '../layout/alert';
import { getLoggedInProfile } from '../../redux/logged-in-profile/logged-in-profile-action';
import {
  addProfileExperienceAction,
  resetProfileExperienceAction,
} from '../../redux/profile-experience/profile-experience-action';
import { removeAlertAction, setAlertAction } from '../../redux/alert/alert-action';

const AddExperience = () => {
  const { 
    isProfileExperienceLoading,
    isProfileExperienceDone,
    profileExperienceError,
  } = useSelector(
    (state) => state.profileExperienceReducer
  );

  const { message } = useSelector((state) => state.alertReducer);

  const dispatcher = useDispatch();
  const navigator = useNavigate();

  const [experienceData, setExperienceData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { 
    title, 
    company, 
    location, 
    from, 
    to, 
    current, 
    description 
  } = experienceData;

  const changeInputHandler = (e) => {
    setExperienceData({
      ...experienceData,
      [e.target.name]: e.target.name === 'current' ? e.target.checked : e.target.value,
    });
  };

  /**
   * Handling when call API done
   */
  useEffect(() => {
    if (isProfileExperienceDone) {
      dispatcher(resetProfileExperienceAction());
      dispatcher(getLoggedInProfile());
      navigator('/dashboard');
    }
  }, [isProfileExperienceDone]);

  /**
   * Handling error
   */
  useEffect(() => {
    if (!profileExperienceError) {
      dispatcher(setAlertAction(profileExperienceError));
    } else {
      dispatcher(removeAlertAction());
    }
  }, [profileExperienceError])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatcher(
      addProfileExperienceAction({
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      })
    );
  };

  return (
    <section className={`${isProfileExperienceLoading ? 'loaded-page ' : ''} section-container`}>
      <div className={isProfileExperienceLoading ? 'loader' : ''}></div>
      <Alert message={ message } />
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={submitHandler}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={changeInputHandler}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={changeInputHandler}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={changeInputHandler}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={changeInputHandler}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              onClick={changeInputHandler}
            />
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={changeInputHandler}
            disabled={current}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={changeInputHandler}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default AddExperience;
