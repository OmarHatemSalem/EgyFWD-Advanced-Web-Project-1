// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require("sharp");

const resizeImage = async  (
  inputDir: string,
  outputDir: string,
  fileName: string,
  height: number,
  width: number
) : Promise<void> => {
  await sharp(`${inputDir}${fileName}.jpg`)
  .resize(height, width)
  .toFile(
    `${outputDir}${fileName}-${height}-${width}.jpg`,
    async (err: Error) => {
      if (err) {
        console.log("Error Occured!");
      } else {
        console.log("Sent:", fileName);
      }
    }
    ).toBuffer();
};

export default resizeImage;
