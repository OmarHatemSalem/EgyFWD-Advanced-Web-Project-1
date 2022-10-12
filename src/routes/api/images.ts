import express from 'express';   
const images = express.Router();

const sharp = require('sharp');


images.get('/', (req, res) => {
    res.send("images here!");

    /*
    res.send(sharp('input.jpg')
  .rotate()
  .resize(200)
  .jpeg({ mozjpeg: true })
  .toBuffer()
  .then( data => { ... })
  .catch( err => { ... });)
    */
    console.log("images here!");
    
    });

export default images;