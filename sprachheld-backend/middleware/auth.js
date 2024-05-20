const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  /**
   * The authentication token.
   * @type {string}
   */
  const token = req.header('x-auth-token');
  console.log("Received token:", token);

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    /**
     * Decoded JWT token.
     * @typedef {Object} DecodedToken
     * @property {string} userId - The user ID extracted from the token.
     * @property {Date} iat - The token's issued at timestamp.
     * @property {Date} exp - The token's expiration timestamp.
     */

    // Verify the JWT token and decode it.
    /** @type {DecodedToken} */
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    console.log("Decoded token:", decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("Token verification Error:", err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};