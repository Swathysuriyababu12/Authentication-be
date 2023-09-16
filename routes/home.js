const express = require("express");
var router = express.Router();
const User = require("../Models/User");

const session = require("express-session");
const RedisStore = require("connect-redis").default;
const client = require("../redis");
const { AuthorizeUser } = require("../Controller/login");

client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log(err.message);
  });
//   console.log(client)

// router.use(
//   session({
//     store: new RedisStore({ client: client }),
//     secret: "secret$%^134",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false, // if true only transmit cookie over https
//       httpOnly: false, // if true prevent client side JS from reading the cookie
//       sameSite: "none",
//       maxAge: 1000 * 60 * 10, // session max age in miliseconds
//     },
//   })
// );

router.get("/getDetails", async (req, res) => {
  try {
    const sess = await client.get("key");
    console.log(sess);
    if (sess) {
      res.status(200).send(sess);
    } else {
      res.send("session expired");
    }
  } catch (error) {
    res.status(500).json({ code: 0, message: "Internal Server Error" });
  }
});

router.get("/check", async function (req, res, next) {
  const auth = await client.get("key");
  if (auth) {
    try {
      var loginCredentials = await AuthorizeUser(auth);
      if (loginCredentials === false) {
        res.status(200).send("Invalid token");
      } else {
        console.log(loginCredentials);
        res.json(loginCredentials);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("Server Busy");
    }
  } else {
    const auth_token = await req.headers.authorization;
    try {
      var loginCredentials = await AuthorizeUser(auth_token);
      if (loginCredentials === false) {
        res.status(200).send("Invalid token");
      } else {
        console.log(loginCredentials);
        res.json(loginCredentials);
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("Server Busy");
    }
  }
});

router.get("/logout", (req, res) => {
  // Destroy the user's session to log them out
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    } else {
      console.log("User logged out");
      res.redirect("/"); // Redirect to the home page or another appropriate page
    }
  });
});

module.exports = router;
