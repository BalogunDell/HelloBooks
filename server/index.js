import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes/api-routes';

require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1', router);

app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log('started');
});

export default app;
