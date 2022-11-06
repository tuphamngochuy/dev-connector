/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  BsFillPersonFill,
  BsFacebook,
  BsTwitter,
  BsLinkedin,
  BsInstagram,
  BsYoutube
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { resetLoggedInProfile, setLoggedInProfile } from '../../redux/logged-in-profile/logged-in-profile-action';

const CreateProfile = () => {
  const { 
    isLoggedInProfileLoading,
    isLoggedInProfileDone,
  } = useSelector(state => state.loggedInProfileReducer);

  const dispatcher = useDispatch();

  const navigator = useNavigate();

  const [createdProfile, setCreatedProfile] = useState({
    status: '',
    company: '',
    website: '',
    location: '',
    skills: '',
    bio: '',
    twitter: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: '',
  });

  const {
    company,
    website,
    location,
    skills,
    bio,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram
  } = createdProfile;

  const changeInputHandler = (e) => {
    setCreatedProfile({
      ...createdProfile,
      [e.target.name]: e.target.value
    });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatcher(setLoggedInProfile(createdProfile));
  }

  /** Go to dashboard page after udpate profile */
  useEffect(() => {
    if (isLoggedInProfileDone) {
      dispatcher(resetLoggedInProfile());
      navigator('/dashboard');
    }
  }, [isLoggedInProfileDone])

  return <section className={`${ isLoggedInProfileLoading ? 'loaded-page ' : '' } section-container`}>
    <div className={ isLoggedInProfileLoading ? 'loader' : '' }></div>
    <h1 className='large text-primary'>
      Create Your Profile
    </h1>
    <p className='lead'>
      <BsFillPersonFill className='ipt-2 imr-2'/> 
      Let's get some information to make your profile stand out
    </p>
    <small>* = required field</small>
    <form className='form' onSubmit={ submitHandler }>
      <div className='form-group'>
        <select name='status' onChange={ changeInputHandler }>
          <option value='0'>* Select Professional Status</option>
          <option value='Developer'>Developer</option>
          <option value='Junior Developer'>Junior Developer</option>
          <option value='Senior Developer'>Senior Developer</option>
          <option value='Manager'>Manager</option>
          <option value='Student or Learning'>Student or Learning</option>
          <option value='Instructor'>Instructor or Teacher</option>
          <option value='Intern'>Intern</option>
          <option value='Other'>Other</option>
        </select>
        <small className='form-text'>
          Give us an idea of where you are at in your career
        </small>
      </div>

      <div className='form-group'>
        <input 
          type='text'
          placeholder='Company'
          name='company'
          value={ company }
          onChange={ changeInputHandler }
        />
        <small className='form-text'>
          Could be your own company or one you work for
        </small>
      </div>

      <div className='form-group'>
        <input
          type='text'
          placeholder='Website'
          name='website'
          value={ website }
          onChange={ changeInputHandler }
        />
        <small className='form-text'>
          Could be your own or a company website
        </small>
      </div>

      <div className='form-group'>
        <input 
          type='text'
          placeholder='Location'
          name='location'
          value={ location }
          onChange={ changeInputHandler }
        />
        <small className='form-text'>
          City & state suggested (eg. Boston, MA)
        </small>
      </div>

      <div className='form-group'>
        <input 
          type='text'
          placeholder='* Skills'
          name='skills'
          required
          value={ skills }
          onChange={ changeInputHandler }
        />
        <small className='form-text'>
          Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
        </small>
      </div>

      <div className='form-group'>
        <textarea 
          placeholder='A short bio of yourself'
          name='bio'
          value={ bio }
          onChange={ changeInputHandler }
        ></textarea>
        <small className='form-text'>Tell us a little about yourself</small>
      </div>

      <div className='my-2'>
        <button type='button' className='btn btn-light'>
          Add Social Network Links
        </button>
        <span>Optional</span>
      </div>

      <div className='form-group social-input'>
        <BsTwitter className='imt-3 imr-3 i-c-primary'/>
        <input
          type='text' 
          placeholder='Twitter URL'
          name='twitter'
          value={ twitter }
          onChange= { changeInputHandler }
        />
      </div>

      <div className='form-group social-input'>
        <BsFacebook className='imt-3 imr-3 i-c-primary'/>
        <input 
          type='text'
          placeholder='Facebook URL'
          name='facebook'
          value={ facebook }
          onChange={ changeInputHandler }
        />
      </div>

      <div className='form-group social-input'>
        <BsYoutube className='imt-3 imr-3 i-c-primary'/>
        <input
          type='text'
          placeholder='YouTube URL'
          name='youtube'
          value={ youtube }
          onChange={ changeInputHandler }
        />
      </div>

      <div className='form-group social-input'>
        <BsLinkedin className='imt-3 imr-3 i-c-primary'/>
        <input
          type='text'
          placeholder='Linkedin URL'
          name='linkedin'
          value={ linkedin }
          onChange={ changeInputHandler }
        />
      </div>

      <div className='form-group social-input'>
        <BsInstagram className='imt-3 imr-3 i-c-primary'/>
        <input
          type='text'
          placeholder='Instagram URL'
          name='instagram'
          value={ instagram }
          onChange={ changeInputHandler }
        />
      </div>

      <input type='submit' className='btn btn-primary my-1' />
      <Link className='btn btn-light my-1' to='/dashboard'>Go Back</Link>
    </form>
  </section>
}

export default CreateProfile;