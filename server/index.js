import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../webpack.config';
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

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
  app.use(webpackHotMiddleware(webpack(webpackConfig)));
}
// Setup Routing
app.use('/api/v1/', router);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Listen at this port
app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log('started');
});

export default app;
