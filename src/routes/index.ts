import express from "express";
import images from "./api/images";

const routes = express.Router();

routes.get("/", (_req: express.Request, res: express.Response) => {
  // console.log(req.url);
  res.send("Hello World!");
});

routes.use("/images", images);

export default routes;
