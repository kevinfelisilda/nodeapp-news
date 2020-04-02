const { buildSchema } = require('graphql');

function generateSchema() {
  const schema = buildSchema(`
    type News {
      id: String
      title: String
      link: String
      date: String
      content: String
      snippet: String
    }

    type Query {
      news: [News]
    }
  `);
  return schema;
}

Object.assign(exports, { generateSchema });
