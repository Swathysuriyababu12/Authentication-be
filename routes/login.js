var express = require("express");
var router = express.Router();
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { AuthenticateUser } = require("../Controller/login");
const client = require("../redis");

client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log(err.message);
  });


router.post("/", async function (req, res, next) {
  try {
    const { email, password } = await req.body;
    var loginCredentials = await AuthenticateUser(email, password);
    console.log(loginCredentials);
    if (loginCredentials === "Invalid User name or Password") {
      res.status(200).send("Invalid User name or Password");
    } else if (loginCredentials === "Server Busy") {
      res.status(200).send("Server Busy");
    } else {
      await client.set("key", loginCredentials.token);
      const value = await client.get("key");
      console.log(value);
      // await client.disconnect();

      res.status(200).json({ token: loginCredentials.token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Busy");
  }
});

module.exports = router;
