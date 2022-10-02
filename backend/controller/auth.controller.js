const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require("../models/User");

/**
 * GET api/auth controller
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
}

exports.loginChecker = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

/**
 * POST api/auth Controller
 * @param { HttpRequest } req 
 * @param { HttpResponse } res 
 */
exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Email is incorrect' }] });
    }

    if (!bcrypt.compare(password, user.password)) {
      return res.status(400).json({ errors: [{ msg: 'Invalid password' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;

        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
}