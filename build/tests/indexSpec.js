"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("../routes"));
const images_1 = __importDefault(require("../routes/api/images"));
const imageProcesser_1 = __importDefault(require("../utilities/imageProcesser"));
const path_1 = __importDefault(require("path"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const request = require("supertest");
//const server = require("../server");
const base_url = "http://localhost:3000/";
describe("GET /", function () {
    it("responds with json", function (done) {
        request(routes_1.default)
            .get("/")
            .set("Accept", "application/json")
            .expect(200, done);
    });
});
it("expect new image with size 300x200", () => {
    expect(images_1.default.get("filename=hippo&width=200&height=300")).toBeTruthy();
});
const inputDir = path_1.default.join(__dirname, "/../../../full") + "\\";
const outputDir = path_1.default.join(__dirname, "/../../thumb") + "/";
it("expect new image with size 300x200", () => {
    expect(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, imageProcesser_1.default)(inputDir, outputDir, "hippo", 300, 200);
    })).not.toThrow();
});
