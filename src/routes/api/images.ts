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
    root: path.join(__dirname, '/../../thumb'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  let inputDir :string = path.join(__dirname, '/../../full')+"\\";
  let outputDir :string = path.join(__dirname, '/../../thumb')+"/";

  let info = new URL(req.url, `http://${req.headers.host}`);

  let fileName = "";
  const height = parseInt(info.searchParams.get("height")!); 
  const width = parseInt(info.searchParams.get("width")!); 
  if (info.searchParams.has("filename")) {fileName = info.searchParams.get("filename")!; /*fileName += ".jpg"*/;}
  else {fileName = "empty.png";}

  
  if (height === NaN || width === NaN) {
    res.send("Please Enter desired height and dimensions");
  } else {


  res.sendFile(`${fileName}${height}${width}.jpg`, options, function (err) {
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
    } else {
      console.log('Retrieved:', fileName)
    }
  })
}
})

export default images;