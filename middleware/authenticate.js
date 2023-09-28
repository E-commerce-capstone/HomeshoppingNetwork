// middleware/authenticate.js
const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token verification failed' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
