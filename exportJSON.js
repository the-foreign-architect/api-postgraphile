'use strict';

const fs = require('fs');
const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  //uri: 'https://api.theforeignarchitect.com/graphql',
  uri: 'http://localhost:3000/graphql',
});

const JSON_DIR = '../frontend-gridsome/src/data';

fetch({
  query: `{
    buildings {
      nodes {
        id
        name
        website
        year
        address
        gfa
        gmapsEmbed
        gmapsLink
        height
        lat
        lng
        typology
        architectBuildings {
          totalCount
          nodes {
            architect {
              id
              name
              website
            }
          }
        }
        city {
          country {
            id
            iso
            name
          }
          id
          name
        }
        links {
          totalCount
          nodes {
            id
            title
            url
            source {
              id
              name
              website
            }
          }
        }
      }
    }
  }`,
}).then(({ data }) => {
  const { buildings } = data;
  console.log(`Writing ${buildings.nodes.length} building files to disk...`);

  for (const building of buildings.nodes) {
    const id = building.id;
    fs.writeFileSync(`${JSON_DIR}/building-${id}.json`, JSON.stringify(building));
  }
  console.log('...done!');
});
