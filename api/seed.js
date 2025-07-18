const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');
const Ticket = require('./models/Ticket');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear previous data
    await User.deleteMany({});
    await Ticket.deleteMany({});

    const passwordHash = await bcrypt.hash('admin123', 10);

    const tenants = ['LogisticsCo', 'RetailGmbH'];

    for (const tenant of tenants) {
      const admin = await User.create({
        email: `admin@${tenant.toLowerCase()}.com`,
        password: passwordHash,
        customerId: tenant,
        role: 'admin',
      });

      const user = await User.create({
        email: `user@${tenant.toLowerCase()}.com`,
        password: passwordHash,
        customerId: tenant,
        role: 'user',
      });

      await Ticket.insertMany([
        {
          title: 'Login Bug',
          description: 'Cannot login from frontend',
          status: 'open',
          customerId: tenant,
          createdBy: admin._id,
        },
        {
          title: 'Workflow Failure',
          description: 'n8n trigger not received',
          status: 'open',
          customerId: tenant,
          createdBy: user._id,
        },
      ]);

      console.log(`✅ Seeded data for ${tenant}`);
    }

    console.log('🌱 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
