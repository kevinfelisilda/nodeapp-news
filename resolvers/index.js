function getResolvers() {
  var root = {
    hello: () => {
      return 'Hello world!';
    },
  };
  return root;
}

Object.assign(exports, { getResolvers });