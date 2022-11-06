const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');

const Post = require('../models/Post');
const User = require('../models/User');
const { json } = require('body-parser');

/**
 * Check { text } in posts
 */
exports.createNewPostChecker = [
  check('text', 'Text is required').not().isEmpty(),
];

/**
 * Create a new post
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.createNewPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { text } = req.body;

  try {
    const authorID = mongoose.Types.ObjectId(req.user.id);
    const author = await User.findById(authorID);

    if (!author) {
      res.status(400).json({ msg: 'Unvalid authentication' });
    }

    const postContent = {
      text: text,
      user: author.id,
      name: author.name,
      avatar: author.avatar,
    };

    const post = new Post(postContent);

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Get all user's posts
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.getAllUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Get ONE post by its ID
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.getPostByID = async (req, res) => {
  try {
    const postID = mongoose.Types.ObjectId(req.query.post_id);
    const post = await Post.findById(postID);
    
    if (!post) {
      return res.status(400).json({ msg: 'Post is not existed' });
    }     

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Delete ONE post by its ID
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.deletePostByID = async (req, res) => {
  try {
    const postID = mongoose.Types.ObjectId(req.query.post_id);
    const post = await Post.findById(postID);

    if (!post) {
      return res.status(400).json({ msg: 'Post is not existed' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'Authentication unvalid' });
    }

    post.remove();

    res.json('Post deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Like a post by its ID
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.likeAPost = async (req, res) => {
  try {
    const postID = mongoose.Types.ObjectId(req.query.post_id);
    const post = await Post.findById(postID);

    if (!post) {
      return res.status(400).json({ msg: 'Post is not existed' });
    }


    const likeIndex = post.likes
      .map(like => like.user.toString()).
      indexOf(req.user.id);
    
    if (likeIndex >= 0) {
      return res.status(200).json({ msg: 'User liked this post before' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Unlike a post by its ID
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.unlikeAPost = async (req, res) => {
  try {
    const postID = mongoose.Types.ObjectId(req.query.post_id);
    const post = await Post.findById(postID);

    if (!post) {
      return res.status(400).json({ msg: 'Post is not existed' });
    }

    const removeIndex = post.likes
      .map(item => item.user.toString())
      .indexOf(req.user.id);

    if (removeIndex < 0) {
      return res.status(200).json({ msg: 'User has not liked the post before' });
    }

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Check { text } in comment
 */
exports.commentAPostChecker = [
  check('text', 'Text is required').not().isEmpty(),
];

/**
 * Add a comment to a post
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.commentAPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { text } = req.body;

  try {
    const authorID = mongoose.Types.ObjectId(req.user.id);
    const author = await User.findById(authorID);

    if (!author) {
      res.status(400).json({ msg: 'Unvalid authentication' });
    }

    const commentContent = {
      text: text,
      user: author.id,
      name: author.name,
      avatar: author.avatar,
    };

    const postID = mongoose.Types.ObjectId(req.query.post_id);
    const post = await Post.findById(postID);

    if (!post) {
      return res.status(400).json({ msg: 'Post is not existed' });
    }

    post.comments.unshift(commentContent);

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}

/**
 * Remove a comment to a post
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.uncommentAPost = async (req, res) => {
  try {
    const postID = mongoose.Types.ObjectId(req.query.post_id);
    const post = await Post.findById(postID);

    if (!post) {
      return res.status(400).json({ msg: 'Post is not existed' });
    }

    const removeIndex = post.comments
      .map(comment => comment.id.toString())
      .indexOf(req.query.comment_id);
    
    if (removeIndex < 0) {
      return res.status(400).json({ msg: 'This comment is not existed' });
    }

    if (post.comments[removeIndex].user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'Unvalid authentication' });
    }

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post);
  } catch(err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}
