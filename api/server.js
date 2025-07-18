const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes    = require('./routes/authRoutes');
const ticketRoutes  = require('./routes/ticketRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const adminRoutes   = require('./routes/adminRoutes');
const testRoutes    = require('./routes/testRoutes');
const screenRoutes  = require('./routes/screenRoutes'); // ✅ NEW

const authenticateJWT = require('./middlewares/authMiddleware');
const rbacMiddleware  = require('./middlewares/rbacMiddleware');

const app = express();
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

app.use('/api', testRoutes);
app.use('/auth', authRoutes);
app.use('/api/tickets', authenticateJWT, ticketRoutes);
app.use('/webhook', webhookRoutes);
app.use('/admin', authenticateJWT, rbacMiddleware, adminRoutes);
app.use('/api', screenRoutes); // ✅ NEW
app.use('/api/webhook', require('./routes/webhookRoutes.js'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
