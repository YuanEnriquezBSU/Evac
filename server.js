const express = require('express');
const cors = require('cors');
const sequelize = require('./config');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('ECM'));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Sync database
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Unable to sync database:', error);
});

// Define routes
app.post('/register', async (req, res) => {
  try {
    const { name, date, email, password } = req.body;
    if (!name || !date || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const user = await User.create({ name, date, email, password });
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Validation error', details: error.errors });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 