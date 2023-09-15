const redis = require('redis');
const Redis = require('ioredis');

// Internal Redis URL, extract the details into environment variables.
// "redis://red-xxxxxxxxxxxxxxxxxxxx:6379"

const renderRedis = new Redis({
  host: process.env.REDIS_SERVICE_NAME, // Render Redis service name, red-xxxxxxxxxxxxxxxxxxxx
  port: process.env.REDIS_PORT || 6379, // Redis port
});

const redisClient = () => {
    return redis.createClient({
      host: 'red-ck1umpfhdsdc738g8gp0', // Use IPv4 loopback address
      port: 6379,
    });
  };
 
  const client = redisClient();
  
  client.on('error', (err) => {
    console.error('Redis Error:', err);
  });
  
  client.on('connect', () => {
    console.log('Connected to Redis');
  });
  client.on('end', () => {
    console.log('Redis connection ended');
  })
  
  client.on('SIGQUIT', () => {
    client.quit();
  })
  

  
  //Configure session middleware
  
  module.exports={client,renderRedis}