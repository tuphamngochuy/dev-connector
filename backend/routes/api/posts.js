const express = require('express');
const {
  createNewPostChecker,
  createNewPost,
  getAllUserPosts,
  getPostByID,
  deletePostByID,
  likeAPost,
  unlikeAPost,
  commentAPostChecker,
  commentAPost,
  uncommentAPost
} = require('../../controller/posts.controller');

const authentication = require('../../middleware/authentication')

const router = express.Router();

/**
 * @route   POST api/posts
 * @desc    Create a new post
 * @access  Private
 */
router.post(
  '/',
  authentication,
  createNewPostChecker,
  createNewPost
);

/**
 * @route   GET api/posts/me
 * @desc    Get all user's posts
 * @access  Private
 */
router.get(
  '/me',
  authentication,
  getAllUserPosts
);

/**
 * @route   GET api/posts/post?post_id
 * @desc    Get post by post's ID
 * @access  Public
 */
router.get(
  '/post',
  getPostByID
);

/**
 * @route   DELETE api/posts/post?post_id
 * @desc    Delete post by post's ID
 * @access  Private
 */
router.delete(
  '/post',
  authentication,
  deletePostByID
);

/**
 * @route   PUT api/posts/like?post_id
 * @desc    Like a post
 * @access  Private
 */
router.put(
  '/like',
  authentication,
  likeAPost
);

/**
 * @route   PUT api/posts/unlike?post_id
 * @desc    Unlike a post
 * @access  Private
 */
router.put(
  '/unlike',
  authentication,
  unlikeAPost
);

/**
 * @route   PUT api/posts/comment?post_id
 * @desc    Comment is a post
 * @access  Private
 */
router.put(
  '/comment',
  authentication,
  commentAPostChecker,
  commentAPost
);

/**
 * @route   PUT api/posts/uncomment?post_id?comment_id
 * @desc    Remove a comment is a post
 * @access  Private
 */
router.put(
  '/uncomment',
  authentication,
  uncommentAPost
);

module.exports = router;