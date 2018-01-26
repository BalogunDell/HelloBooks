import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

import router from './routes/api-routes';

require('dotenv').config();

const port = process.env.PORT || 3003;
const app = express();

// Log every request to the console
app.use(morgan('dev'));

// Use Body Parser for incoming data request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Header for Cross Origin Resource Sharing
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// send bundle js
app.get('/bundle.js', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'dist/bundle.js')
));

app.use('/api/v1/', router);

// send index.html
app.get('/*', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'dist/index.html'))
);

// Listen at this port
app.listen(port, (err) => {
  if (err) console.log(err);
  console.log('started');
});

export default app;
