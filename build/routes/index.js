"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./api/images"));
const routes = express_1.default.Router();
const app = (0, express_1.default)();
routes.get("/", (_req, res) => {
    // console.log(req.url);
    res.send("Hello World!");
});
routes.use("/images", images_1.default);
app.use("/", routes);
/*app.listen(3000, (): void => {
  console.log("server started at http://localhost:30000");
});*/
exports.default = app;
