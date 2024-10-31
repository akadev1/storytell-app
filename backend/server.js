const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const storyRoutes = require('./routes/stories');
const WebSocket = require('ws');
const winston = require('winston');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  winston.info('New WebSocket connection');

  ws.on('message', (message) => {
    winston.info(`Received message: ${message}`);
    // Handle incoming messages
  });

  ws.on('close', () => {
    winston.info('WebSocket connection closed');
  });

  ws.on('error', (error) => {
    winston.error(`WebSocket error: ${error}`);
  });
});
