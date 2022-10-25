"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageProcesser_1 = __importDefault(require("../../utilities/imageProcesser"));
const node_fs_1 = require("node:fs");
const images = express_1.default.Router();
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
images.get('/', function (req, res, next) {
    var options = {
        root: path_1.default.join(__dirname, '/../../thumb'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    let inputDir = path_1.default.join(__dirname, '/../../../full') + "\\";
    let outputDir = path_1.default.join(__dirname, '/../../thumb') + "/";
    let info = new URL(req.url, `http://${req.headers.host}`);
    let fileName = "";
    const height = parseInt(info.searchParams.get("height"));
    const width = parseInt(info.searchParams.get("width"));
    if (info.searchParams.has("filename")) {
        fileName = info.searchParams.get("filename"); /*fileName += ".jpg"*/
        ;
    }
    else {
        fileName = "empty.png";
    }
    if (isNaN(height) || isNaN(width)) {
        res.send("Please Enter desired height and dimensions");
    }
    else {
        //const myLog = new File(`${outputDir}${fileName}${height}${width}.jpg`);
        (0, node_fs_1.access)(`${outputDir}${fileName}${height}${width}.jpg`, node_fs_1.constants.F_OK, (err) => {
            console.log('does not exist');
            (0, imageProcesser_1.default)(inputDir, outputDir, fileName, height, width);
            res.sendFile(`${fileName}${height}${width}.jpg`, options);
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
exports.default = images;
