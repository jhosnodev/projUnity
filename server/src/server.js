const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const path = require("path");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
const {Users} = require('./db')
//const Service = require('./services').userServices


const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());

passport.use(new Strategy(
  async function (username, password, done) {
    await Users.findOne({email: username}, function (err,user){
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user); 
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const userdata = await Users.findOne({where: {id: id}, raw: true});
    if (userdata) { done(null, userdata.id)}
  } catch (error) {
    return done(err)
  }
});

server.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());

server.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
      const uniqueId = uuidv4();
      const fileExtension = path.extname(file.originalname);
      const newFilename = `${uniqueId}${fileExtension}`;
      cb(null, newFilename);
    }
    /*
     destination: path.join(__dirname, 'public/uploads'),
     filename: (req, file, cb) => {
      cb(null, new Date().getTime() + path.extname(file.originalname));
     }
    */
  });
  
//Este middleware detecta cada vez que se suba un archivo tenga el nombre de image  
server.use(multer({storage}).single('image'));

server.use(router);

module.exports = server;
