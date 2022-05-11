import { Router } from "express";
import { createTodo } from "../controller/todos";

/* u can use Router like this to */
// const express = require('express');
// const router = express.Router();

const router = Router();

router.post("/", createTodo);

router.get("/");

router.patch("/:id");

router.delete("/:id");

export default router;
