"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("../routes"));
const images_1 = __importDefault(require("../routes/api/images"));
it('expect Hello World', () => {
    expect(routes_1.default.get("/")).toBeTruthy();
});
it('expect new image with size 300x200', () => {
    expect(images_1.default.get('filename=hippo&width=200&height=300')).toBeTruthy();
});
