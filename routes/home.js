const express = require("express");
var router = express.Router();
const User = require("../Models/User");

const session = require('express-session');
const RedisStore = require("connect-redis").default
const client=require("../redis");

client.connect().then(() => {
    console.log('Connected to Redis');
  }).catch((err) => {
    console.log(err.message);
  })
  console.log(client)


  router.use(session({
    store: new RedisStore({ client: client }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
  }))


router.get("/", async (req, res) => {
        try {
            const sess = await req.session;
            console.log(sess)
if(sess.username){
    res.status(200).send(sess.username);
} else{
    res.send("login");
}             
        } catch (error) {
          res.status(500).json({ code: 0, message: "Internal Server Error" });
        }
      })

      router.get("/", async (req, res) => {
        try {
            const sess = await req.session;
            console.log(sess)
if(sess.username){
    res.status(200).send(sess.username);
} else{
    res.send("sesssion expired");
}             
        } catch (error) {
          res.status(500).json({ code: 0, message: "Internal Server Error" });
        }
      })


      router.get('/logout', (req, res) => {
        // Destroy the user's session to log them out
        req.session.destroy((err) => {
          if (err) {
            console.error('Error destroying session:', err);
          } else {
            console.log('User logged out');
            res.redirect('/'); // Redirect to the home page or another appropriate page
          }
        });
      });
      


module.exports = router;   