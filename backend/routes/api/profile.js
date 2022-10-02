const express = require('express');

const { 
  createOrUpdateProfile,
  createOrUpdateProfileChecker,
  getMyProfile,
  getAllProfile,
  getUserProfileByID,
  deleteUserProfile,
  updateProfileExperience,
  deleteProfileExperience,
  updateProfileEducation,
  deleteProfileEducation
} = require('../../controller/profile.controller');
const authentication = require('../../middleware/authentication');

const router = express.Router();

/**
 * @route   POST api/profile
 * @desc    Create or update profile
 * @access  Private
 */
router.post('/', authentication, createOrUpdateProfileChecker, createOrUpdateProfile);

/**
 * @route   GET api/profle/me
 * @desc    Get my profile
 * @access  Private
 */
router.get('/me', authentication, getMyProfile);

/**
 * @route   GET api/profile
 * @desc    Get all profiles
 * @access  Public
 */
router.get('/', getAllProfile);

/**
 * @route   GET api/profile/user?user_id
 * @desc    Get user's profile by user's ID
 * @access  Public
 */
router.get('/user', getUserProfileByID);

/**
 * @route   DELETE api/profile
 * @desc    Delete profile, user & posts
 * @access  Private
 */
router.delete('/', authentication, deleteUserProfile);

/**
 * @route   PUT api/profile/experience
 * @desc    Update profile's experience
 * @access  Private
 */
router.put('/experience', authentication, updateProfileExperience);


/**
 * @route   DELETE api/profile/experience?exp_id
 * @desc    Delete experience from profile
 * @access  Private
 */
router.delete('/experience', authentication, deleteProfileExperience);

/**
 * @route   PUT api/profile/education
 * @desc    Update profile's education
 * @access  Private
 */
router.put('/education', authentication, updateProfileEducation);

/**
 * @route   DELETE api/profile/education?edu_id
 * @desc    Delete education from profile
 * @access  Private
 */
router.delete('/education', authentication, deleteProfileEducation);

module.exports = router;