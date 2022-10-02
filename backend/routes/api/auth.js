const express = require('express');

const authentication = require('../../middleware/authentication');
const { login, loginChecker, getUser } = require('../../controller/auth.controller');

const router = express.Router();

/**
 * @route   GET api/auth
 * @desc    Get user by bearer token
 * @access  Private
 */
router.get('/', authentication, getUser);

/**
 * @route   POST api/auth
 * @desc    Authenticate user for login
 * @access  Public
 */
router.post('/', loginChecker, login);

module.exports = router;