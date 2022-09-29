const express = require('express');

const UsersController = require('../../controller/users.controller');

const router = express.Router();

/**
 * @route   POST api/user
 * @desc    Register new user
 * @access  PUBLIC
 */
router.post('/', UsersController.register);

module.exports = router;