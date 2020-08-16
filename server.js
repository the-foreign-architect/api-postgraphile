require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');
// var session = require('express-session')
const serveStatic = require('serve-static');
const path = require('path');
// const jwt = require("express-jwt");
// const jwksRsa = require("jwks-rsa");
const { postgraphile } = require('postgraphile');
const { connection, schema, options } = require('./.postgraphilerc.js');

// Set up Auth0 configuration
// var jwtCheck = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'https://tfa.eu.auth0.com/.well-known/jwks.json'
//   }),
//   audience: 'https://api.theforeignarchitect.com',
//   issuer: 'https://tfa.eu.auth0.com/',
//   algorithms: ['RS256'],
//   credentialsRequired: false,
// });

const app = express();
app.use(bodyParser.json())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true
// }))
// CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept, folder');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use(cors())

// app.use('/graphql', jwtCheck);

app.use(postgraphile(connection, schema, options));

app.use(serveStatic(path.join(__dirname, '/public')));

//const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server started on port', port);
  console.log('Node environment is ', process.env.NODE_ENV);
  console.log('Database URL is ', process.env.DATABASE_URL);
});
