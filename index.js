require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index.route');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch(err => {
    console.log(err)
  });

app.use('/api', routes);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
