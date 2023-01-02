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
const imageProcesser_1 = __importDefault(require("../utilities/imageProcesser"));
const path_1 = __importDefault(require("path"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const supertest = require("supertest");
//const server = require("../server");
const base_url = "http://localhost:3000/";
const index_1 = __importDefault(require("../routes/index")); // Link to your server file
const request = supertest(index_1.default);
describe("Test endpoint responses", () => {
    it("should give 300", () => __awaiter(void 0, void 0, void 0, function* () {
        // note:  use "/images" and not "http://localhost:3000/images"
        const response = yield request.get("/");
        expect(response.status).toBe(200);
    }));
});
const inputDir = path_1.default.join(__dirname, "/../../../full") + "\\";
const outputDir = path_1.default.join(__dirname, "/../../thumb") + "/";
it("expect new image with size 300x200", () => {
    expect(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, imageProcesser_1.default)(inputDir, outputDir, "hippo", 300, 200);
    })).not.toThrow();
});
