const resolver = require('../../resolvers/news');
const cache = require('../../helpers/cache');
const rss = require('../../helpers/rss');

describe('resolvers/news', () => {
  let sandbox;
  let cacheData;
  let rssData;

  beforeEach(async () => {
    cacheData = null;
    rssData = { items: [] };
    sandbox = sinon.createSandbox();
    sandbox.stub(cache, 'get').callsFake(async () => cacheData);
    sandbox.stub(rss, 'parseURL').callsFake(async () => rssData);
  });

  afterEach(async () => {
    sandbox.restore();
  });

  it('should return cache data if present', async () => {
    cacheData = [{ id: 1 }];
    const result = await resolver();
    expect(cache.get.getCall(0).args[0]).to.be.equal('news');
    expect(rss.parseURL.called).to.be.false;
    expect(result).to.deep.equal([{ id: 1 }]);
  });

  it('should return news data from source', async () => {
    const result = await resolver();
    expect(cache.get.getCall(0).args[0]).to.be.equal('news');
    expect(rss.parseURL.called).to.be.true;
    expect(result).to.deep.equal([]);
  });
});
