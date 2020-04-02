const Parser = require('rss-parser');
const cache = require('../helpers/cache');

const URL = 'https://www.who.int/feeds/entity/csr/don/en/rss.xml';

const parser = new Parser();

const news = async () => {
  const data = await cache.get('news');
  if (data) {
    return data;
  }

  const { items } = await parser.parseURL(URL);
  const result = items.map(item => ({
    id: item.guid,
    title: item.title,
    link: item.link,
    date: item.pubDate,
    content: item.content,
    snippet: item.contentSnippet,
  }));
  await cache.set('news', result);
  return result;
}

module.exports = news;
