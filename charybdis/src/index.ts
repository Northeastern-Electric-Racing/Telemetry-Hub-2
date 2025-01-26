import express, { Request, Response } from "express";
import { dump } from "./controllers/dump.controller";
import { upload } from "./controllers/upload.controller";
import { compareCloudToLocal } from "./controllers/compare.controller";

// Create a new express application instance
const app = express();

// Set the network port
const port = process.env.PORT || 3000;

// Define the root path with a greeting message
app
  .get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Express + TypeScript Server!" });
  })
  .put("/dump", (req: Request, res: Response) => {
    dump(req, res);
  })
  .put("/upload", (req: Request, res: Response) => {
    upload(req, res);
  })
  .get("/compare", (req: Request, res: Response) => {
    compareCloudToLocal(req, res);
  });

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
