const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mailRoutes = require('./routes/mail');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/mail', mailRoutes); // <-- changed from '/api/mail/generate'

// Root route
app.get('/', (req, res) => {
  res.send('✅ Node.js + Express API is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
