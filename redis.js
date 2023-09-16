const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();
// Internal Redis URL, extract the details into environment variables.
// "redis://red-xxxxxxxxxxxxxxxxxxxx:6379"

const redisClient = () => {
  console.log("redis", process.env.REDIS_SERVICE_NAME, process.env.REDIS_PORT);
  return redis.createClient({
    url: process.env.REDIS_URL,
  });
};

const client = redisClient();

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

client.on("connect", () => {
  console.log("Connected to Redis");
});
client.on("end", () => {
  console.log("Redis connection ended");
});

client.on("SIGQUIT", () => {
  client.quit();
});

//Configure session middleware

module.exports = client;
