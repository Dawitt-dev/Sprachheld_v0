// routes/api/protected.js
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route  GET /api/protected
// @desc   Protected route
// @access Private
router.get('/', auth, (req, res) => {
  res.json({ msg: 'This is a protected route' });
});

module.exports = router;