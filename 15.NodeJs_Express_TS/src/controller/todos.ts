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

export const getTodos: RequestHandler = (req, resp, next) => {
  resp.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, resp, next) => {
  const todoId = req.params.id;
  const updatedText = req.body.text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    resp.status(404).json({ message: "Todo not found" });
  } else {
    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
    resp.json({
      message: "Todo updated successfully",
      updatedTodo: TODOS[todoIndex],
    });
  }
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, resp, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    resp.status(404).json({ message: "Todo not found" });
  } else {
    TODOS.splice(todoIndex, 1);
    resp.json({ message: "Todo deleted successfully" });
  }
};
