const news = require('./news');

function getResolvers() {
  var root = {
    news: async () => {
      const result = await news();
      return result;
    }
  };
  return root;
}

Object.assign(exports, { getResolvers });
