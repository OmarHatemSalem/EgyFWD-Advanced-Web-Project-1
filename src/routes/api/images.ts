import express from 'express';   
import path from 'path';
import resizeImage from '../../utilities/imageProcesser';
import { access, constants } from 'node:fs';
const images = express.Router();
const request = require('supertest');



/*images.get('/', (req, res) => {
    res.send(path.join(__dirname, '/../../full'));

    /*
    res.send(sharp('input.jpg')
  .rotate()
  .resize(200)
  .jpeg({ mozjpeg: true })
  .toBuffer()
  .then( data => { ... })
  .catch( err => { ... });)
  
    console.log("images here!");
    
    });*/

images.get('/', function (req:express.Request, res:express.Response, next:express.NextFunction) {
  var options = {
    root: path.join(__dirname, '/../../thumb'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  let inputDir :string = path.join(__dirname, '/../../../full')+"\\";
  let outputDir :string = path.join(__dirname, '/../../thumb')+"/";

  let info = new URL(req.url, `http://${req.headers.host}`);

  let fileName = "";
  const height = parseInt(info.searchParams.get("height")!); 
  const width = parseInt(info.searchParams.get("width")!); 
  if (info.searchParams.has("filename")) {fileName = info.searchParams.get("filename")!; /*fileName += ".jpg"*/;}
  else {fileName = "empty.png";}

  
  if (isNaN(height) || isNaN(width)) {
    res.send("Please Enter desired height and dimensions");
  } else {
    //const myLog = new File(`${outputDir}${fileName}${height}${width}.jpg`);
    access(`${outputDir}${fileName}${height}${width}.jpg`, constants.F_OK, (err) => {
      console.log('does not exist');
      resizeImage(inputDir, outputDir, fileName, height, width);
      setTimeout(() => {
        res.sendFile(`${fileName}${height}${width}.jpg`, options);
      }, 1000)
    });

  //res.sendStatus(200);
  }

  /*res.sendFile(`${fileName}${height}${width}.jpg`, options, function (err) {
    if (err) {
      sharp(`${inputDir}${fileName}.jpg`)
      .resize(height, width)
      .toFile(`${outputDir}${fileName}${height}${width}.jpg`, function(err: Error) {
        if (err) {
          next(err)
        } else {
          console.log('Sent:', fileName)
        }
      });

      res.sendFile(`${fileName}${height}${width}.jpg`, options);
      res.sendStatus(200);
    } else {
      console.log('Retrieved:', fileName)
      res.sendStatus(200);
    }
  })*/
});

export default images;