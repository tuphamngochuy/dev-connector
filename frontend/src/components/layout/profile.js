import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { 
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsInstagram,
  BsLinkedin
} from 'react-icons/bs';

import { removeAlertAction, setAlertAction } from '../../redux/alert/alert-action';
import { getIdProfileAction, resetIdProfileAction } from '../../redux/id-profile/id-profile-action';

import Alert from './alert';
import Utils from '../../utils';

const Profile = () => { 
  const { 
    isIdProfileLoading, 
    idProfileData, 
    idProfileError 
  } = useSelector(state => state.idProfileReducer);

  const { message } = useSelector(state => state.alertReducer);

  const { profile_id } = useParams();
  
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(resetIdProfileAction());
    dispatcher(removeAlertAction());
    dispatcher(getIdProfileAction({ profile_id: profile_id }));
  }, []);

  useEffect(() => {
    if (idProfileError === '') {
      dispatcher(removeAlertAction());
    } else {
      dispatcher(setAlertAction(idProfileError))
    }
  }, [idProfileError])

  return  <section className={`${ isIdProfileLoading ? 'loaded-page ' : '' } section-container`}>
  <div className={ isIdProfileLoading ? 'loader' : '' }></div>
  <Alert message={ message } />
    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>

    {
      idProfileData && <div className="profile-grid my-1">
        <div className="profile-top bg-primary p-2">
          <img
            className="round-img my-1"
            src={ idProfileData.user.avatar }
            alt=""
          />
          <h1 className="large">{ idProfileData.user.name }</h1>
          <p className="lead">{ idProfileData.company }</p>
          <p>{ idProfileData.location }</p>
          <div className="icons my-1">
            {
              idProfileData.social.facebook && <a 
                href={ idProfileData.social.facebook } 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <BsFacebook />
              </a>
            }
            {
              idProfileData.social.twitter && <a 
                href={ idProfileData.social.twitter } 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <BsTwitter />
              </a>
            }
            {
              idProfileData.social.linkedin && <a 
                href={ idProfileData.social.linkedin } 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <BsLinkedin />
              </a>
            }
            {
              idProfileData.social.instagram && <a 
                href={ idProfileData.social.instagram } 
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram />
              </a>
            } 
            {
              idProfileData.social.youtube && <a 
                href={ idProfileData.social.youtube } 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <BsYoutube />
              </a>
            }
          </div>
        </div>
      
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{ `${ idProfileData.user.name }'s Bio` }</h2>
          <p>
            { idProfileData.bio || 'This bio has not been updated' }
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {
              idProfileData.skills && idProfileData.skills.map((skill, index) => {
                return <div key={ index } className="p-1">{ skill }</div>
              })
            }
          </div>
        </div>
      
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
          {
            idProfileData.experience.length > 0 && idProfileData.experience.map((exp, id) => {
              return <div key={ id }>
                <h3 className="text-dark">{ exp.company }</h3>
                <p>
                  { Utils.displayTimePretty(exp.from) } - { ' ' } { Utils.displayTimePretty(exp.to, true) }
                </p>
                <p><strong>Position: </strong>{ exp.title }</p>
                <p>
                  <strong>Description: </strong>
                  { exp.description }
                </p>
              </div>
            })
          }
        </div>
      
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
          {
            idProfileData.education.length > 0 && idProfileData.education.map((edu, id) => {
              return <div key={ id }>
                <h3>{ edu.school }</h3>
                <p>
                  { Utils.displayTimePretty(edu.from) } - { ' ' } { Utils.displayTimePretty(edu.to, true) }
                </p>
                <p><strong>Degree: </strong>{ edu.degree }</p>
                <p><strong>Field Of Study: </strong>{ edu.fieldofstudy }</p>
                <p>
                  <strong>Description: </strong>
                  { edu.description }
                </p>
              </div>
            })
          }
        </div>
      </div>
    }
  </section>
}

export default Profile;