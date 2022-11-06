import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

import Alert from '../layout/alert';
import { getLoggedInProfile } from '../../redux/logged-in-profile/logged-in-profile-action';
import {
  addProfileEducationAction,
  resetProfileEducationAction
} from '../../redux/profile-education/profile-education-action';
import {
  setAlertAction,
  removeAlertAction
} from '../../redux/alert/alert-action';

const AddEducation = () => {
  const {
    isProfileEducationLoading,
    isProfileEducationDone,
    profileEducationError
  } = useSelector(
    (state) => state.profileEducationReducer
  );

  const { message } = useSelector((state) => state.alertReducer);

  const dispatcher = useDispatch();
  const navigator = useNavigate();

  const [educationData, setEducationData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = educationData;

  const changeInputHandler = (e) => {
    setEducationData({
      ...educationData,
      [e.target.name]: e.target.name === 'current' ? e.target.checked : e.target.value,
    })
  }

  /**
   * Handling when call API done
   */
  useEffect(() => {
    if (isProfileEducationDone) {
      dispatcher(resetProfileEducationAction());
      dispatcher(getLoggedInProfile());
      navigator('/dashboard');
    }
  }, [isProfileEducationDone]);

  /**
   * Handling error
   */
  useEffect(() => {
    if (!profileEducationError) {
      dispatcher(setAlertAction(profileEducationError));
    } else {
      dispatcher(removeAlertAction());
    }
  }, [profileEducationError])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatcher(
      addProfileEducationAction({
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      })
    );
  }

  return <section className={`${isProfileEducationLoading ? 'loaded-page ' : ''} section-container`}>
    <div className={isProfileEducationLoading ? 'loader' : ''}></div>
    <Alert message={ message } />
    <h1 className='large text-primary'>
      Add Your Education
    </h1>
    <p className='lead'>
      <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc that
      you have attended
    </p>
    <small>* = required field</small>
    <form className='form' onSubmit={ submitHandler }>
      <div className='form-group'>
        <input
          type='text'
          placeholder='* School or Bootcamp'
          name='school'
          value={ school }
          onChange={ changeInputHandler }
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder='* Degree or Certificate'
          name='degree'
          value={ degree }
          onChange={ changeInputHandler }
          required
        />
      </div>
      <div className='form-group'>
        <input 
          type='text' 
          placeholder='* Field Of Study' 
          name='fieldofstudy'
          value={ fieldofstudy }
          onChange={ changeInputHandler }
          required
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
            onClick={ changeInputHandler }
          />
          Current School
        </p>
      </div>
      <div className='form-group'>
        <h4>To Date</h4>
        <input
          type='date'
          name='to'
          value={ to }
          onChange={ changeInputHandler }
          disabled={ current }
        />
      </div>
      <div className='form-group'>
        <textarea
          name='description'
          cols='30'
          rows='5'
          placeholder='Job Description'
          value={ description }
          onChange={ changeInputHandler }
        ></textarea>
      </div>
      <input type='submit' className='btn btn-primary my-1' />
      <Link className='btn btn-light my-1' to='/dashboard'>
        Go Back
      </Link>
    </form>
  </section>
}

export default AddEducation;