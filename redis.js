const redis = require('redis');
const dotenv = require("dotenv");
dotenv.config();
// Internal Redis URL, extract the details into environment variables.
// "redis://red-xxxxxxxxxxxxxxxxxxxx:6379"



const redisClient = () => {
    return redis.createClient({
         host: process.env.REDIS_SERVICE_NAME,
         port: process.env.REDIS_PORT,
        
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