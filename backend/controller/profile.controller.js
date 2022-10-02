const { check, validationResult } = require('express-validator');
const { findOne } = require('../models/Profile');

const Profile = require('../models/Profile');
const User = require('../models/User');

/**
 * check { status, skills } for create or update user's profile
 */
exports.createOrUpdateProfileChecker = [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills is required').not().isEmpty(),
]

/**
 * Create or update user's profile controller
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 * @returns HttpResponse or Throw Error
 */
exports.createOrUpdateProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const profileInput = req.body;

  const profileFields = {};

  profileFields.user = req.user.id;

  const socialMedia = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'];

  for (const prop in profileInput) {
    if (profileInput[prop]) {
      if (prop === 'skills') {
        profileFields.skills = profileInput.skills.split(',').map(skill => skill.trim());
        continue;
      }
      
      if (socialMedia.includes(prop)) {
        profileFields.social = profileFields.social || {};
        profileFields.social[prop] = profileInput[prop];
        continue;
      }
  
      profileFields[prop] = profileInput[prop];
    }
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true },
      );
    } else {
      profile = new Profile(profileFields);

      await profile.save();
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Get user himself profile controller
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Get all proifles controller
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.getAllProfile = async (req, res) => {
  try {
    const profiles = await Profile.find().select('user').populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Get user's profile controller
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.getUserProfileByID = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.query.user_id });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Delete user and user's profile
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.deleteUserProfile = async (req, res) => {
  try {
    //Remove profile
    await Profile.findOneAndDelete({ user: req.user.id });

    //Remove user
    await User.findOneAndDelete({ user: req.user.id });

    //TODO: Remove posts
    /** Code here */

    /** */

    res.json('User deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Update ONE experience in user's profile
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.updateProfileExperience = async (req, res) => {
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  //If user don't provide the end day of experience, this is the current job
  if (!to) {
    to = Date.now;
    current = true;
  }

  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift(newExp);
    profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
}

/**
 * Delete ONE experience in user's profile by experience's ID
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.deleteProfileExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.query.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
}

/**
 * Update ONE education in user's profile
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
 exports.updateProfileEducation = async (req, res) => {
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = req.body;

  //If user don't provide the end day of education, this is the current education
  if (!to) {
    to = Date.now;
    current = true;
  }

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift(newEdu);
    profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
}

/**
 * Delete ONE education in user's profile by education's ID
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.deleteProfileEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.query.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
}