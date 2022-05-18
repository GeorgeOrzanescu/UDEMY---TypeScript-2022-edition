"use strict";
// import { Request, Response, NextFunction } from "express";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
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
const getTodos = (req, resp, next) => {
    resp.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, resp, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        resp.status(404).json({ message: "Todo not found" });
    }
    else {
        TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
        resp.json({
            message: "Todo updated successfully",
            updatedTodo: TODOS[todoIndex],
        });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, resp, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        resp.status(404).json({ message: "Todo not found" });
    }
    else {
        TODOS.splice(todoIndex, 1);
        resp.json({ message: "Todo deleted successfully" });
    }
};
exports.deleteTodo = deleteTodo;
