// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require("sharp");

const resizeImage = (
  inputDir: string,
  outputDir: string,
  fileName: string,
  height: number,
  width: number
) : void => {
  sharp(`${inputDir}${fileName}.jpg`)
    .resize(height, width)
    .toFile(
      `${outputDir}${fileName}${height}${width}.jpg`,
      function (err: Error) {
        if (err) {
          console.log("Error Occured!");
        } else {
          console.log("Sent:", fileName);
        }
      }
    );
};

export default resizeImage;
