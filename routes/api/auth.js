const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Bcrypt is an npm package that allows us to encrypt passwords
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken'); // Jsonwebtoken is an npm package that allows us to create a token
const config = require('config'); // Config is an npm package that allows us to access global variables

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test route
// @access  Public
// router.get('/', (req, res) => res.send('User route'));
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth (This is the route we want to hit)
// @desc    Authenticate user & get token (This is what the route does)
// @access  Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please IS required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req); // This is an array of errors
    if (!errors.isEmpty()) {
      // If there are errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; // Destructure req.body

    try {
      let user = await User.findOne({ email }); // See if user exists
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials ' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password); // Compare the password that the user enters with the encrypted password in the database

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials ' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      ); // Return jsonwebtoken
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
