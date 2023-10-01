const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const path = require("path");



const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cors());

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
