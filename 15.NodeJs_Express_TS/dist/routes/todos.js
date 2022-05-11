"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controller/todos");
/* u can use Router like this to */
// const express = require('express');
// const router = express.Router();
const router = (0, express_1.Router)();
router.post("/", todos_1.createTodo);
router.get("/");
router.patch("/:id");
router.delete("/:id");
exports.default = router;
