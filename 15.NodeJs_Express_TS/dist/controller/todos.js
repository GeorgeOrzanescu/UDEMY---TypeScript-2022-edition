"use strict";
// import { Request, Response, NextFunction } from "express";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, resp, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    resp
        .status(201)
        .json({ message: "Todo created successfully", createdTodo: newTodo });
};
exports.createTodo = createTodo;
