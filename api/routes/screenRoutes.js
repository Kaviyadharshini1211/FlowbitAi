// routes/screenRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const registry = require('../registry.json');

const router = express.Router();

router.get('/me/screens', authMiddleware, (req, res) => {
  const tenantScreens = registry.find(entry => entry.tenant === req.user.customerId);
  if (!tenantScreens) {
    return res.status(404).json({ message: 'No screens found for tenant' });
  }

  res.json(tenantScreens.screens);
});

module.exports = router;
