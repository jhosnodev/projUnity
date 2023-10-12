require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const Autorization = require('./utils/seguridadrutas');
const bodyParser = require("body-parser");

const server = express();

server.set('views', __dirname+'/views')
server.set('view engine', 'ejs')
server.use(morgan("dev"));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cors());
server.use(require('express-session')({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false
}))
server.use(cookieParser());
server.use(passport.initialize());
server.use(passport.session());

server.use((req,res,next) => {
  next()
})


server.use('/', authRouter);
server.use('/', indexRouter);

module.exports = server;
