const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Post = require('../models/Post');

// @route    GET api/posts
// @desc     Get all posts
// @access   Public
// router.get('/', auth, async (req, res) => {
//   try {
//     // const user = await User.findById(req.user.id).select('-password');
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  auth,
  // [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.body.id).select('-password');

      console.log(user);

      const newPost = new Post({
        description: req.body.description,
        images: req.body.images,
        title: req.body.title,
        user: user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/posts/user/:userId
// @desc     Get all posts by a user
// @access   Public
router.get('/user/:userId', async (req, res) => {
  try {
    // find the posts made by userid
    const posts = await Post.find({ user: req.params.userId });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/new
// @desc     Get newest posts
// @access   Public
router.get('/new', async (req, res) => {
  try {
    const posts = await Post.find({}).sort('-date');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/posts/trending
// @desc     Get trending posts
// @access   Public

// @route    DELETE api/posts/:postId
// @desc     Delete a post
// @access   Private
router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/posts/like/:postId
// @desc     Like or unlike a post
// @access   Private

// @route    POST api/posts/comment/:postId
// @desc     Comment on a post
// @access   Private

// @route    DELETE api/posts/comment/:postId/:comment_id
// @desc     Delete comment
// @access   Private

module.exports = router;
