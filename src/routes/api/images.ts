import express from "express";
import path from "path";
import resizeImage from "../../utilities/imageProcesser";
import { access, constants } from "node:fs";
import fs from "fs";
const images = express.Router();

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

images.get(
  "/",
  function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const options = {
      root: path.join(__dirname, "/../../../thumb"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    };

    const inputDir: string = path.join(__dirname, "/../../../full") + "\\";
    const outputDir: string = path.join(__dirname, "/../../../thumb") + "\\";

    const info = new URL(req.url, `http://${req.headers.host}`);

    
    let fileName = "";
    const height = parseInt(info.searchParams.get("height")!);
    const width = parseInt(info.searchParams.get("width")!);
    if (info.searchParams.has("filename")) {
      fileName = info.searchParams.get("filename")!; /*fileName += ".jpg"*/
    } else {
      fileName = "empty.png";
    }
    
    const outPath = `${outputDir}${fileName}-${height}-${width}.jpg`
    const inPath = `${inputDir}${fileName}.jpg`

    if (isNaN(height) || isNaN(width)) {
      res.send("Please Enter desired height and width dimensions");
    } else if ( height<=0 || width<=0){
      res.send("Please Enter positive height and width dimensions");
    } else if (fs.existsSync(inPath)) {
      //const myLog = new File(`${outputDir}${fileName}${height}${width}.jpg`);
      access(
        outPath,
        constants.F_OK,
        (err) => {
          console.log("does not exist");
          resizeImage(inputDir, outputDir, fileName, height, width);
          setTimeout(() => {
            res.sendFile(`${fileName}-${height}-${width}.jpg`, options);
          }, 1000);
        }
      );

      //res.sendStatus(200);
    } else if (!fs.existsSync(inPath)) {
      res.send("Filename not found!")
    }


  }
);

export default images;
