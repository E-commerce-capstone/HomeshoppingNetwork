const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 4000;
const corsMiddleware = require('./cors');
const authenticateToken = require('./middleware/authenticate');


app.use(bodyParser.json());

const SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key
// server.js


app.use(corsMiddleware);

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This route is protected.' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
