require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const cookieParser = require('cookie-parser');
const path = require("path");
const passport = require('passport');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const Autorization = require('./utils/seguridadrutas');
const paymentsRoutes = require("./routes/payment.routes.js")

const server = express();

server.set('views', __dirname+'/views')
server.set('view engine', 'ejs')
server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
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


server.use('/', authRouter);
server.use('/', indexRouter);
server.use("/",paymentsRoutes);


module.exports = server;
