/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  BsFillPersonFill,
  BsFileEarmarkPerson,
  BsFillBagFill,
  BsBookFill,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';  

import { getLoggedInProfile } from '../../redux/logged-in-profile/logged-in-profile-action';
import Utils from '../../utils';
import { removeProfileExperienceAction, resetProfileExperienceAction } from '../../redux/profile-experience/profile-experience-action';
import { removeProfileEducationAction, resetProfileEducationAction } from '../../redux/profile-education/profile-education-action';

const Dashboard = () => {
  //Logged In profile reducer
  const { loggedInProfileData, isLoggedInProfileLoading } = useSelector(
    (state) => state.loggedInProfileReducer
  );

  const dispatcher = useDispatch();

  useEffect(() => {
    if (loggedInProfileData === '') {
      dispatcher(getLoggedInProfile());
    }
  }, []);

  return (
    <>
      {loggedInProfileData === '' ? <NoProfileLayout /> : <ProfileLayout loadingState={ isLoggedInProfileLoading } profileData={ loggedInProfileData } />}
    </>
  );
};

const NoProfileLayout = () => {
  const navigator = useNavigate();

  const createProfileHandler = () => {
    navigator('/create-profile');
  };

  return (
    <section className='section-container'>
      <p className='lh-3 f-2'>
        <BsFillPersonFill className='ipt-2 imr-2' />
        You have no profile. Please create one.
      </p>
      <div>
        <button onClick={createProfileHandler} className='btn btn-primary'>
          Create profile
        </button>
      </div>
    </section>
  );
};

const ProfileLayout = ({ profileData, loadingState }) => {
  const { isProfileExperienceDone } = useSelector(
    state => state.profileExperienceReducer
  );

  const { isProfileEducationDone } = useSelector(
    (state) => state.profileEducationReducer
  );

  const dispatcher = useDispatch();

  const { name, education, experience } = JSON.parse(
    profileData !== '' ? profileData : '{}'
  );

  /**
   * Handling delete experience
   */
  useEffect(() => {
    if (isProfileExperienceDone) {
      dispatcher(resetProfileExperienceAction());
      dispatcher(getLoggedInProfile());
    }
  }, [isProfileExperienceDone]);

  const deleteExperienceHandler = (e) => {
    e.preventDefault();
    dispatcher(removeProfileExperienceAction({ exp_id: e.target.id }));
  }

  /**
   * Handling delete education
   */
  useEffect(() => {
    if (isProfileEducationDone) {
      dispatcher(resetProfileEducationAction());
      dispatcher(getLoggedInProfile());
    }
  }, [isProfileEducationDone]);

  const deleteEducationHandler = (e) => {
    e.preventDefault();
    dispatcher(removeProfileEducationAction({ edu_id: e.target.id }));
  }

  return (
    <section className={`${loadingState ? 'loaded-page ' : ''} section-container`}>
      <div className={loadingState ? 'loader' : ''}></div>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <BsFillPersonFill className='ipt-2 imr-2' />
        Welcome {name}
      </p>
      <div className='dash-buttons'>
        <Link to='/create-profile' className='btn btn-light'>
          <BsFileEarmarkPerson className='ipt-1 imr-1 i-c-primary' />
          Edit Profile
        </Link>
        <Link to='/add-experience' className='btn btn-light'>
          <BsFillBagFill className='ipt-1 imr-1 i-c-primary' />
          Add Experience
        </Link>
        <Link to='/add-education' className='btn btn-light'>
          <BsBookFill className='ipt-1 imr-1 i-c-primary' />
          Add Education
        </Link>
      </div>

      <h2 className='my-2'>Experience Credentials</h2>
      <Table striped hover className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience.length > 0 &&
            experience.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.company}</td>
                  <td className='hide-sm'>{element.title}</td>
                  <td className='hide-sm'>
                    { Utils.displayTime(element.from) } - { ' ' }
                    { Utils.displayTime(element.to, true) }
                  </td>
                  <td>
                    <button 
                      id={ element._id } 
                      className='btn btn-danger' 
                      onClick={ deleteExperienceHandler }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Field of Study</th>
            <th className='hide-sm'>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education.length > 0 &&
            education.map((element, index) => {
              return (
                <tr key={ index }>
                  <td>{ element.school }</td>
                  <td className='hide-sm'>{ element.degree }</td>
                  <td className='hide-sm'>{ element.fieldofstudy }</td>
                  <td className='hide-sm'>
                    { Utils.displayTime(element.from) } - { ' ' }
                    { Utils.displayTime(element.to, true) }
                  </td>
                  <td>
                    <button 
                      id={ element._id } 
                      className='btn btn-danger' 
                      onClick={ deleteEducationHandler }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='my-2'>
        <button className='btn btn-danger'>
          <i className='fas fa-user-minus'></i>
          Delete My Account
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
