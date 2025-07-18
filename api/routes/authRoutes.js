// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../middlewares/authMiddleware');
const bcrypt = require('bcrypt');

const User = require('../models/User'); // ✅ Add this line


const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign(
    {
      userId: user._id,
      customerId: user.customerId,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// ✅ Add this new route
router.get('/me', authenticateJWT, async (req, res) => {
  res.json({
    userId: req.user.userId,
    customerId: req.user.customerId,
    role: req.user.role
  });
});

module.exports = router;
