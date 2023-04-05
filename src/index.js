const app = require('./app');

import express, { json } from 'express';
import bodyParser from 'body-parser';
// const { urlencoded } = pkg;
import cors from 'cors';
import http from 'http';
import formidable from 'formidable';
import { readFileSync, readFile, writeFile, appendFile } from 'fs';
import multer, { diskStorage } from "multer";
import stream from 'stream';
import path from "path";
import etag from 'etag';
//
import { dirname } from 'path';
import {createServer} from "https"
import {fileURLToPath} from 'url';
// const app = express();

const port = '8080';
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
};

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Headers", "Origin , Content-Type, application/json");
//   next();
// });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
// app.use(cors())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "localhost:3000/rayyanisalm/"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.post("/storedMenu/", function(req, res, next) {

   console.log(req.body?.menu, "ZXCVBNM");

  
  
  const menuJson =  JSON.stringify(req.body.menu)
  
  
  
   writeFile("menu.json", menuJson,   {
     encoding: "utf8",
     flag: "w",
     mode: 0o666
   }  , function(err) {
     if(err) {
         return console.log(err, "error writing to storedMenu.json");
     }
     console.log("The storedMenu file was saved!");
  });
 
  
  
      res.redirect("/")
    });
    app.get("/loadMenu", function(req, res, next) {
      console.log("get");
    readFile('menu.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'json'});
        res.write(data);
        return res.end();
      });
    })
    
  app.get("/hello", function(req, res, next) {
    console.log("hello ok");
  })


app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});