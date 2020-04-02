const news = require('./news');

function getResolvers() {
  var root = {
    hello: () => {
      return 'Hello world!';
    },
    news: async () => {
      const result = await news();
      return result;
    }
  };
  return root;
}

Object.assign(exports, { getResolvers });
