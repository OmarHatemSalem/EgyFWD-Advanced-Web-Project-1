import express from 'express';   
import path from 'path';
const images = express.Router();

const sharp = require('sharp');


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

images.get('/', function (req, res, next) {
  var options = {
    root: path.join(__dirname, '/../../full'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  let info = new URL(req.url, `http://${req.headers.host}`);

  let fileName = "";
  if (info.searchParams.has("filename")) {fileName = info.searchParams.get("filename")!; fileName += ".jpg";}
  else {fileName = "empty.png";}

  
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})

export default images;