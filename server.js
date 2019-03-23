require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const { postgraphile } = require('postgraphile');
const { connection, schema, options } = require('./.postgraphilerc.js');

const app = express();

app.use(cors());

app.use(postgraphile(connection, schema, options));

app.use(serveStatic(path.join(__dirname, '/public')));

//const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server started on port', port);
  console.log('Node environment is ', process.env.NODE_ENV);
  console.log('Database URL is ', process.env.DATABASE_URL);
});
