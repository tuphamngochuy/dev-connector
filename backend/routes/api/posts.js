const express = require('express');

const authentication = require('../../middleware/authentication')

const router = express.Router();

/**
 * @route   POST api/posts
 * @desc    Create new post
 * @access  Private
 */

/**
 * @route   GET api/posts/post?post_id
 * @desc    Get post by post_id
 * @access  Public
 */

/**
 * @route   GET api/posts/posts?user_id
 * @desc    Get post by post_id
 * @access  Public
 */

module.exports = router;