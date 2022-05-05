'use strict';

const express = require('express');
const storageRoutes = require('./routes/storageRoutes')
const authRoutes = require('./auth/routes');

const app = express();

app.use(express.json());
app.use(authRoutes);

app.use('/api/storage', storageRoutes)

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
