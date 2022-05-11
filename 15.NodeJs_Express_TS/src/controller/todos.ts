// import { Request, Response, NextFunction } from "express";

// export const createTodo = (
//   req: Request,
//   resp: Response,
//   next: NextFunction
// ) => {};

import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, resp, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  resp
    .status(201)
    .json({ message: "Todo created successfully", createdTodo: newTodo });
};
