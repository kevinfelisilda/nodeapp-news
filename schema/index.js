const { buildSchema } = require('graphql');

function generateSchema() {
  const schema = buildSchema(`
    type Query {
      hello: String
    }
  `);
  return schema;
}

Object.assign(exports, { generateSchema });
