const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require("path");
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {Users} = require('./db')
//const Service = require('./services').userServices


const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());
server.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
server.use(cookieParser());
server.use(passport.initialize());
server.use(passport.session());

server.use((req,res,next) => {
  console.log(req.session);
  console.log(req.email),
  next()
})

passport.serializeUser(function(user, done) {
  console.log(user, user.id, `passport.serializeUser`)
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.findOne({where: {id: id}}).then(function(err,user) {
      if (user) { 
        return done(null, user.id)
      }
    }).catch(err => done(err))
});


// passport.use(new Strategy(
//   function (username, password, done) {
//     console.log(username, `strategy`)
//     Users.findOne({where: {email: username}, raw: true}).then(function (err,user){
//       if (err) { return done(err); }
//       if (!user) {
//         console.log('Incorrect username.');
//         return done(null, false, {message: 'Incorrect email'}); 
//       } else if (password != user.password) {
//         console.log('incorrect password')
//         return done(null,false, {message: 'Incorrect password'})
//       } else {
//         console.log('ok')
//         return done(null, user); 
//       }
//       // if (!user.verifyPassword(password)) { return done(null, false); }
//       // return done(null, user); 
//     });
//   }
// ));
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false,
    session: false
  },
  function(username, password, done) {
    Users.findOne({where: {email: username }}, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));


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
  
  // server.post('/login', passport.authenticate('local',{ successRedirect: '/users',failureRedirect: '/login' }),
  // function(req, res) {
  //     console.log(req)
  //     res.redirect('/');
  // })

//Este middleware detecta cada vez que se suba un archivo tenga el nombre de image  
server.use(multer({storage}).single('image'));

server.set('views', __dirname+'/views')
server.set('view engine', 'ejs')

server.use(router);

module.exports = server;
