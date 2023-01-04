import express from "express";
import path from "path";
import resizeImage from "../../utilities/imageProcesser";
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
  async function (
    req: express.Request,
    res: express.Response  ) : Promise<void> {
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const height = parseInt(info.searchParams.get("height")!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const width = parseInt(info.searchParams.get("width")!);
    if (info.searchParams.has("filename")) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fileName = info.searchParams.get("filename")!; /*fileName += ".jpg"*/
    } else {
      fileName = "empty.png";
    }
    
    const outPath = `${outputDir}${fileName}-${height}-${width}.jpg`;
    const inPath = `${inputDir}${fileName}.jpg`;

    console.log(`${height} - ${width}`);

    if (isNaN(height) || isNaN(width)) {
      res.send("Please Enter desired height and width dimensions");
    } else if ( height<=0 || width<=0){
      res.send("Please Enter positive height and width dimensions");
    } else if (fs.existsSync(inPath) && fs.existsSync(outPath)) {
      res.status(200).sendFile(outPath);
    } else if (fs.existsSync(inPath) && !fs.existsSync(outPath)) {
        console.log("does not exist");
        try {
          await resizeImage(inputDir, outputDir, fileName, height, width);
          await res.status(200).sendFile(outPath);
        } catch (e) {
          res.send("error");
        }
    } else if (!fs.existsSync(inPath)) {
      res.send("Filename not found!");
    }


  }
);

export default images;
