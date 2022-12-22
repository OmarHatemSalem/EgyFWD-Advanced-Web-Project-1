import routes from "../routes";
import images from "../routes/api/images";
import resizeImage from "../utilities/imageProcesser";
import path from "path";

it("expect Hello World", () => {
  expect(routes.get("/")).toBeTruthy();
});

it("expect new image with size 300x200", () => {
  expect(images.get("filename=hippo&width=200&height=300")).toBeTruthy();
});

const inputDir: string = path.join(__dirname, "/../../../full") + "\\";
const outputDir: string = path.join(__dirname, "/../../thumb") + "/";

it("expect new image with size 300x200", () => {
  expect(async () => {
    await resizeImage(inputDir, outputDir, "hippo", 300, 200);
  }).not.toThrow();
});
