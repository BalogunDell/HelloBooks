import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import router from './routes/api-routes';

require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

// Log every request to the console
app.use(morgan('dev'));

// Use Body Parser for incoming data request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Header for Cross Origin Resource Sharing
app.use(cors());

// Setup Routing
app.use('/api', router);

// Listen at this port
app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log('started');
});

export default app;
