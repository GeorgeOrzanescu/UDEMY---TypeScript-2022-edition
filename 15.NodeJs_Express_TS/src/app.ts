import { NextFunction } from "connect";
import express from "express";
import todoRoutes from "./routes/todos";
import { json } from "body-parser";

const app = express();

app.use(json()); // parse application/json

app.use("/todos", todoRoutes);

app.use(
  (
    err: Error,
    req: express.Request,
    resp: express.Response,
    next: NextFunction
  ) => {
    resp.status(500).json({ message: err.message });
  }
);

app.listen(3000);
