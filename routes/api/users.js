const express = require('express');
const router = express.Router();
const gravatar = require('gravatar'); // Gravatar is an npm package that allows us to associate an avatar with an email address
const bcrypt = require('bcryptjs'); // Bcrypt is an npm package that allows us to encrypt passwords
const jwt = require('jsonwebtoken'); // Jsonwebtoken is an npm package that allows us to create a token
const config = require('config'); // Config is an npm package that allows us to access global variables

const { check, validationResult } = require('express-validator');

const User = require('../../models/User'); // Bring in the User model

// @route   POST api/users
// @desc    Register user
// @access  Public
// router.get('/', (req, res) => res.send('User route'));
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req); // This is an array of errors
    if (!errors.isEmpty()) {
      // If there are errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; // Destructure req.body

    try {
      let user = await User.findOne({ email }); // See if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm', // Default
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10); // Generate a salt for the password

      user.password = await bcrypt.hash(password, salt); // Encrypt the password

      await user.save(); // Save the user to the database

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
