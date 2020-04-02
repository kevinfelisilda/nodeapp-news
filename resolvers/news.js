const cache = require('../helpers/cache');
const rss = require('../helpers/rss');

const URL = 'https://www.who.int/feeds/entity/csr/don/en/rss.xml';

const news = async () => {
  const data = await cache.get('news');
  if (Array.isArray(data) && data.length) {
    return data;
  }

  const { items } = await rss.parseURL(URL);
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
