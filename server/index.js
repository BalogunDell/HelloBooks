import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes/api-routes';
import header from './middleware/header';

require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();
app.use(morgan('dev'));

// Use Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Setup Routing
app.use('/api', router);

// Use Header for Cross Origin Resource Sharing
app.use(header.setHeaders);

// Listen at this port
app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log('started');
});

export default app;
