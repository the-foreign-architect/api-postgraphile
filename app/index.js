const { ApolloServer, gql } = require('apollo-server');

import {Architect, Building} from './models';

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
    architects: [Architect!]!
    architect(id: ID!): Architect
    buildings: [Building!]!
    building(id:ID!): Building
  }
  type Architect {
    "Information about an architect or office"
    id: Int
    name: String
    website: String
  }
  type Building {
    "Information about a building"
    id: Int
    name: String
    website: String
    address: String
    lat: Float
    lng: Float
    gmaps_link: String
    gmaps_embed: String
    city_id: Int
    height: String
    gfa: String
    function: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
    architect: (parent, { id }, context, info) => Architect.findById(id),
    architects: () => Architect.findAll(),
    building: (parent, { id }, context, info) => Building.findById(id),
    buildings: () => Building.findAll(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
