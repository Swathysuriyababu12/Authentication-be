const redis = require('redis');

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
  
  module.exports=client