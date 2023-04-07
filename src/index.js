const app = require('./app');

import express, { json } from 'express';
import bodyParser from 'body-parser';

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

;
//app.use(bodyParser.urlencoded({ extended: false }));




app.use(bodyParser.json({limit: '50mb'}));



app.post("/storedMenu/", function(req, res, next) {


  
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
    
app.post("/id", function(req, res) {
  console.log(req.body?.id, "ZXCVBNM");
  const id =  JSON.stringify(req.body.id)
  
  
  
   appendFile("id.json", menuJson,   {
     encoding: "utf8",
     flag: "w",
     mode: 0o666
   }  , function(err) {
     if(err) {
         return console.log(err, "error writing to storedMenu.json");
     }
     console.log("The storedMenu file was saved!");
  });
})


app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});