const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();
// Internal Redis URL, extract the details into environment variables.
// "redis://red-xxxxxxxxxxxxxxxxxxxx:6379"

const redisClient = () => {
  console.log("redis", process.env.REDIS_SERVICE_NAME, process.env.REDIS_PORT);
  return redis.createClient({
    // host: "rediss://red-ck2397821fec73b0cmv0:Nelc9qMXhmbJDahgUXscVuvi6xrzx0Bt@singapore-redis.render.com",
    // port: 6379,
    url: "rediss://red-ck1umpfhdsdc738g8gp0:JEmDnPpuFAhBNhM6HAKU2DttaHp5wTrq@oregon-redis.render.com:6379",
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
