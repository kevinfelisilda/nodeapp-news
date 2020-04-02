const Parser = require('rss-parser');

const parser = new Parser();

const parseURL = async (url) => parser.parseURL(url);

Object.assign(exports, { parseURL });
