const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db/tfa.db',
  },
  useNullAsDefault: true,
});

const queries = {
  getBuilding: function(id) {
    return
    knex({ building: 'building', architect: 'architect', city: 'city', country: 'country', link: 'link' })
      .select()
      .where(architect.id = building.architect_id)



    knex('building')
      .where('id', parseInt(id))
      .first();
  },
};
module.exports = queries;
