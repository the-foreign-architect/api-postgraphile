'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const dbPath = path.resolve(__dirname, 'tfa.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true,
    timestamps: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('🗄  Connection with DB has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export const Architect = sequelize.define('architect', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  website: {
    type: Sequelize.STRING,
  },
});
export const Building = sequelize.define('building', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  website: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  lng: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  gmaps_link: {
    type: Sequelize.STRING,
  },
  gmaps_embed: {
    type: Sequelize.STRING,
  },
  visited: {
    type: Sequelize.INTEGER,
  },
  bucket_list: {
    type: Sequelize.INTEGER,
  },
  year: {
    type: Sequelize.INTEGER,
  },
  date_visited: {
    type: Sequelize.STRING,
  },
  height: {
    type: Sequelize.STRING,
  },
  gfa: {
    type: Sequelize.STRING,
  },
  function: {
    type: Sequelize.STRING,
  },
});
