import routes from "../routes";
import images from "../routes/api/images";
import resizeImage from "../utilities/imageProcesser";
import path from "path";
import express from "express";


// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require("supertest");
//const server = require("../server");


const base_url = "http://localhost:3000/";


describe("GET /", function() {
  it("responds with json", function(done) {
    request(routes)
      .get("/")
      .set("Accept", "application/json")
      .expect(200, done);
  });
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
