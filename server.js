const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  // Add more user objects here
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY);
  res.json({ token });
});

// Add more routes for registration and token validation

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
