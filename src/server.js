'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const storageRoutes = require('./routes/storageRoutes')
const authRoutes = require('./auth/routes');
const res = require('express/lib/response');
const app = express();

app.use(cors());
app.use(morgan('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/storage', storageRoutes)
app.use(authRoutes);


app.use('*', () => {
  console.log('no route found');
  res.status(404).send('no route found')
});


module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
