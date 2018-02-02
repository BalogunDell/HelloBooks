import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import winston from 'winston';
import validator from 'express-validator';
// import webpackMiddleware from 'webpack-dev-middleware';
// import webpack from 'webpack';

// import webpackDevConfig from '../webpack.dev.config';
import appRouter from './routes';

require('dotenv').config();

const port = process.env.PORT || 3003;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/api/v1/', appRouter);

// if (process.env.NODE_ENV === 'development') {
//   app.use(webpackMiddleware(webpack(webpackDevConfig)));
// }
app.get('/bundle.js', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'dist/bundle.js')
));

app.get('/*', (req, res) => res.sendFile(
  path.join(path.dirname(__dirname), 'dist/index.html'))
);

app.listen(port, (err) => {
  winston.level = 'info';
  if (err) winston.log('info', err);
  winston.log('info', 'application started');
});

export default app;
