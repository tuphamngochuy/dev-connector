const express = require('express');

const authentication = require('../../middleware/authentication')

const router = express.Router();

/**
 * @route   POST api/posts
 * @desc    Create new post
 * @access  Private
 */
router.post('/', authentication);

/**
 * @route   GET api/posts/me
 * @desc    Get all user's posts
 * @access  Private
 */

/**
 * @route   GET api/posts/post?post_id
 * @desc    Get post by post's ID
 * @access  Public
 */

/**
 * @route   DELETE api/posts/post?post_id
 * @desc    Delete post by post's ID
 * @access  Private
 */

/**
 * @route   PUT api/posts/like?post_id
 * @desc    Like a post
 * @access  Private
 */

/**
 * @route   PUT api/posts/unlike?post_id
 * @desc    Unlike a post
 * @access  Private
 */

/**
 * @route   PUT api/posts/comment?post_id
 * @desc    Comment is a post
 * @access  Private
 */

/**
 * @route   PUT api/posts/uncomment?post_id
 * @desc    Uncomment is a post
 * @access  Private
 */

module.exports = router;