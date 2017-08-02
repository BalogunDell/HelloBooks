const express = require('express');
const router = require('./routes/api-routes.js');

const app = express();

const port = 3000 || process.env.port;


app.use('/api', router);
app.listen(port, () => {
  console.log(`app started at ${port}`);
});
