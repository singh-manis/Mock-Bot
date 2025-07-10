const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Auth header:', authHeader); // Debug log
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Malformed token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId }; // FIX: use userId from payload
    next();
  } catch (err) {
    console.error('JWT error:', err); // Debug log
    res.status(401).json({ error: 'Invalid token' });
  }
}; 