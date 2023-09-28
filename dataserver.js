const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; // Choose an available port
const cors = require('cors'); // Import the cors middleware

app.use(cors(corsOptions));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());

// Define a route to fetch data from the external API
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Data fetching server is running on port ${port}`);
});
app.use(cors(corsOptions));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});