require('dotenv').config();
// PLUGINS
// Simplifies the graphile-build-pg inflector to trim the `ByFooIdAndBarId` from relations
const PgSimplifyInflectorPlugin = require('@graphile-contrib/pg-simplify-inflector');

// DB DETAILS
// Our database URL
const connection = process.env.DATABASE_URL || 'postgresql://tfa:svsHfaMn8MCLnHh@localhost/tfa';
// The PostgreSQL schema within our postgres DB to expose
const schema = ['public'];

// OPTIONS
const graphiql = process.env.NODE_ENV === 'development';
const watch = process.env.NODE_ENV === 'development';
const enhanceGraphiql = process.env.NODE_ENV === 'development';
const extendedErrors = [];
if (process.env.NODE_ENV === 'development') {
  const extendedErrors = ['hint', 'detail', 'errcode'];
}

// Send back JSON objects rather than JSON strings
const dynamicJson = true;

const appendPlugins = [PgSimplifyInflectorPlugin];
const connectionFilterRelations = true;
const connectionFilterAllowEmptyObjectInput = true;
const connectionFilterAllowNullInput = true;
// Extends the error response with additional details from the Postgres error.
// Can be any combination of  ['hint', 'detail', 'errcode']. Default is [].

module.exports = {
  connection,
  schema,
  options: {
    dynamicJson,
    graphiql,
    watchPg: watch,
    appendPlugins,
    connectionFilterRelations,
    connectionFilterAllowEmptyObjectInput,
    connectionFilterAllowNullInput,
    enhanceGraphiql,
    extendedErrors,
  },
};
