// routes/api/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('config'); 
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// @route  GET /api/auth
// @desc   Get authenticated user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

// @route  POST /api/auth
// @desc   Authenticate user & get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ], 
  async (req, res) => {
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`); // Debugging

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        console.log('User not found'); // Debugging
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Check if password matches
    console.log(`Stored Hashed Password: ${user.password}`); // Debugging
    const isMatch = bcrypt.compareSync(password, user.password);
    console.log(`Password Match: ${isMatch}`); // Debugging

    if (!isMatch) {
      console.log('Password does not match'); // Debugging
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Return JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
