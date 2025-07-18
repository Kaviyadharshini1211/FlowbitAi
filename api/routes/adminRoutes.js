// routes/adminRoutes.js
const express = require('express');
const router = express.Router();

// Admin-only test route
router.get('/stats', (req, res) => {
  res.json({
    message: 'Admin access granted',
    user: req.user, // shows the user from the token
  });
});

module.exports = router;
