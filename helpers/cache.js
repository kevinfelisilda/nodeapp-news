const bluebird = require('bluebird');
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(
  parseInt(process.env.REDIS_PORT, 10) || 6379,
  process.env.REDIS_HOST || 'localhost',
  { return_buffers: true },
);

const cache = {
  get: async (key) => {
    const entry = await client.getAsync(key);
    // TODO: encrypt data
    return JSON.parse(entry);
  },
  set: async (key, entry) => {
    const data = JSON.stringify(entry);
    await client.setAsync(key, data);
  },
}

module.exports = cache;
