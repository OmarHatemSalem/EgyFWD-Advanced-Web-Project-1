import resizeImage from "../utilities/imageProcesser";
import path from "path";


// eslint-disable-next-line @typescript-eslint/no-var-requires
const supertest = require("supertest");
//const server = require("../server");




import app from "../routes/index"; // Link to your server file
const request = supertest(app);

describe("Test endpoint responses", () => {
  it("should give 300", async (): Promise<void> => {
    // note:  use "/images" and not "http://localhost:3000/images"
    const response = await request.get(
      "/"
    );
    expect(response.status).toBe(200);
  });
});


const inputDir: string = path.join(__dirname, "/../../../full") + "\\";
const outputDir: string = path.join(__dirname, "/../../thumb") + "/";

it("expect new image with size 300x200", () => {
  expect(async () => {
    await resizeImage(inputDir, outputDir, "hippo", 300, 200);
  }).not.toThrow();
});
