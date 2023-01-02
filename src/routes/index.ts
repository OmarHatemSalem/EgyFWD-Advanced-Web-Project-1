import express from "express";
import images from "./api/images";

const routes = express.Router();

const app = express();

routes.get("/", (_req: express.Request, res: express.Response) => {
  // console.log(req.url);
  res.send("Hello World!");
});
routes.use("/api/images", images);


app.use("/", routes);

/*app.listen(3000, (): void => {
  console.log("server started at http://localhost:30000");
});*/

export default app;
