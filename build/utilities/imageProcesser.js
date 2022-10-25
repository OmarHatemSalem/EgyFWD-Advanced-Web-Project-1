"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require('sharp');
const resizeImage = (inputDir, outputDir, fileName, height, width) => {
    sharp(`${inputDir}${fileName}.jpg`)
        .resize(height, width)
        .toFile(`${outputDir}${fileName}${height}${width}.jpg`, function (err) {
        if (err) {
            console.log("Error Occured!");
        }
        else {
            console.log('Sent:', fileName);
        }
    });
};
exports.default = resizeImage;
