import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeAlertAction, setAlertAction } from '../../redux/alert/alert-action';
import { getAllProfileAction, resetAllProfileAction } from '../../redux/all-profile/all-profile-action';

import Alert from './alert';

const Profiles = () => {
  const { 
    isAllProfileLoading, 
    allProfileData, 
    allProfileError 
  } = useSelector(state => state.allProfileReducer);

  const { message } = useSelector(state => state.alertReducer);

  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(removeAlertAction());
    dispatcher(resetAllProfileAction());
    dispatcher(getAllProfileAction());
  }, []);

  useEffect(() => {
    if (allProfileError === '') {
      dispatcher(removeAlertAction());
    } else {
      dispatcher(setAlertAction(allProfileError));
    }
  }, [allProfileError]);

  return <section className={`${ isAllProfileLoading ? 'loaded-page ' : '' } section-container`}>
  <div className={ isAllProfileLoading ? 'loader' : '' }></div>
  <Alert message={ message } />
  <h1 className="large text-primary">Developers</h1>
  <p className="lead">
    Browse and connect with developers
  </p>
  <div className="profiles">
    {
      allProfileData && allProfileData.map(({ _id, company, location, skills, user}) => {
          return <div key={ _id } className="profile bg-light">
          <img
            className="round-img"
            src={ user.avatar }
            alt=""
          />
          <div>
            <h2>{ user.name }</h2>
            <p>{ company }</p>
            <p>{ location }</p>
            <Link to={ `/profile/${_id}` } className="btn btn-primary">View Profile</Link>
          </div>
        
          <ul>
            {
              skills.map((skill, index) => <li key={ index } className="text-primary">
                { skill }
              </li>)
            }
          </ul>
        </div>
      })
    }
  </div>
</section>
}

export default Profiles;
