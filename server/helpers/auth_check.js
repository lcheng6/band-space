const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../../config');
/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
};
// app.use(function(req, res, next) {
//   // check header or url parameters or post parameters for token
//   var token = req.headers['authorization'];
//   if (!token) return next(); //if no token, continue
//
//   token = token.replace('Bearer ', '');
//
//   jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
//     if (err) {
//       return res.status(401).json({
//         success: false,
//         message: 'Please register Log in using a valid email'
//       });
//     } else {
//       req.user = user; //set the user to req so other routes can use it
//       next();
//     }
//   });
// });