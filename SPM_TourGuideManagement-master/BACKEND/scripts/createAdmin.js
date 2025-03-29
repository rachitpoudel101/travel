const mongoose = require('mongoose');
const User = require('../models/User');

async function createDefaultAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/tourguide', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const adminExists = await User.findOne({ user_name: 'admin' });
        if (!adminExists) {
            const admin = new User({
                user_name: 'admin',
                full_name: 'System Admin',
                email: 'admin@system.com',
                password: 'admin',
                role: 'admin'
            });
            await admin.save();
            console.log('Default admin user created successfully');
        } else {
            // Update admin password if it exists but password is different
            if (adminExists.password !== 'admin' || adminExists.role !== 'admin') {
                adminExists.password = 'admin';
                adminExists.role = 'admin';
                await adminExists.save();
                console.log('Admin credentials reset to defaults');
            }
        }
    } catch (error) {
        console.error('Error managing admin:', error);
    } finally {
        mongoose.disconnect();
    }
}

createDefaultAdmin();
