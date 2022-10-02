const express = require('express');

const { register, registerChecker } = require('../../controller/users.controller');

const router = express.Router();

/**
 * @route   POST api/user
 * @desc    Register new user
 * @access  PUBLIC
 */
router.post('/', registerChecker, register);

module.exports = router;