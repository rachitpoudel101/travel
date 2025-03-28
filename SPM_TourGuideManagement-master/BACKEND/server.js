const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8070;

const PackageRouter = require("./routes/packages.js")
const cusPackRouter = require("./routes/cusPacks.js");
const paymentRouter = require('./routes/payment-route');
const paymentHistoryRouter = require('./routes/payment-history-route')
const hotelRouter = require ("./routes/hotels.js");
const roomRouter = require ("./routes/rooms.js");
const UserRouter = require("./routes/user-route");
const tourguideRouter = require("./routes/tourguides.js");

// Apply middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Tour Guide Management System API is running');
});

// In-memory database as last resort fallback
const mockDb = {
  tourguides: [],
  packages: [],
  hotels: [],
  rooms: [],
  users: [],
  payments: [],
  paymentHistory: [],
  customPackages: []
};

// Function to connect to MongoDB
async function connectToDatabase() {
  // Primary connection to MongoDB Atlas
  const CLOUD_URL = process.env.MONGODB_URL;
  const LOCAL_URL = 'mongodb://127.0.0.1:27017/tourguide'; // Fallback to local MongoDB
  
  console.log('Attempting to connect to MongoDB Atlas...');
  
  try {
    await mongoose.connect(CLOUD_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB Atlas connection successful!');
    return true;
  } catch (err) {
    console.error('MongoDB Atlas connection error:', err);
    
    // Try connecting to local MongoDB as fallback
    console.log('Attempting to connect to local MongoDB...');
    try {
      await mongoose.connect(LOCAL_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Local MongoDB connection successful!');
      return true;
    } catch (localErr) {
      console.error('Local MongoDB connection error:', localErr);
      console.log('WARNING: Using in-memory mock database. Data will not persist between restarts!');
      return false;
    }
  }
}

// Setup routes with database options
function setupRoutes(useRealDb) {
  if (useRealDb) {
    // Use normal MongoDB-based routes
    app.use("/package", PackageRouter);
    app.use("/cusPack", cusPackRouter);
    app.use("/payment", paymentRouter);
    app.use("/payments/history", paymentHistoryRouter);
    app.use("/hotel", hotelRouter);
    app.use("/room", roomRouter);
    app.use("/user", UserRouter);
    app.use("/tourguide", tourguideRouter);
  } else {
    // Use in-memory mock database routes
    // Example for /tourguide endpoints
    app.get('/tourguide/get', (req, res) => {
      res.json(mockDb.tourguides);
    });

    app.get('/tourguide/get/:id', (req, res) => {
      const guide = mockDb.tourguides.find(g => g._id === req.params.id) || 
        { fullName: 'Demo Guide', age: 30, address: 'Demo Address', gender: 'Male', 
          dateOfBirth: '1993-01-01', contactNumber: '1234567890', nicNumber: '123456789V', 
          eMail: 'demo@example.com', workExperience: '5 years', amount: '5000' };
      res.json(guide);
    });

    app.post('/tourguide/add', (req, res) => {
      const newGuide = { ...req.body, _id: Date.now().toString() };
      mockDb.tourguides.push(newGuide);
      res.status(201).json({ status: 'Tour guide added successfully' });
    });

    app.patch('/tourguide/update/:id', (req, res) => {
      const index = mockDb.tourguides.findIndex(g => g._id === req.params.id);
      if (index >= 0) {
        mockDb.tourguides[index] = { ...mockDb.tourguides[index], ...req.body };
      } else {
        mockDb.tourguides.push({ ...req.body, _id: req.params.id });
      }
      res.json({ status: 'Tour guide updated successfully' });
    });

    // Similar mock endpoints for other routes...
  }
}

// Start the server
async function startServer() {
  const isConnected = await connectToDatabase();
  
  // Set up routes based on database connection status
  setupRoutes(isConnected);
  
  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`API available at: http://localhost:${PORT}`);
    if (!isConnected) {
      console.log('NOTE: Running with in-memory database. All data will be lost when server restarts.');
    }
  });
}

startServer();