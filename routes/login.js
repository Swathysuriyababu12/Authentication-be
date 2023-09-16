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

router.use(
  session({
    store: new RedisStore({ client: client }),
    // store:new RedisStore({ client: renderRedis}),
    secret: "secret$%^134",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      sameSite: "none",
      maxAge: 1000 * 60 * 10, // session max age in miliseconds
    },
  })
);

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
      const sess = await req.session;
      console.log(sess);
      sess.username = email;
      console.log(sess.username);
      res.status(200).json({ token: loginCredentials.token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Busy");
  }
});

module.exports = router;
