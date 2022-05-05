'use strict';

const express = require('express');

const authRoutes = require('./auth/routes');

const app = express();

app.use(express.json());
app.use(authRoutes);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
