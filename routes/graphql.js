var graphqlHTTP = require('express-graphql');
const { generateSchema } = require('../schema');
const { getResolvers } = require('../resolvers');

const graphql = (app) => {
  const schema = generateSchema();
  const resolver = getResolvers();
  
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true,
  }));
}

module.exports = graphql;
