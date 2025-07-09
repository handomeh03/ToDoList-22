import express from "express";
import { AddTodo, deleteTodo, getTodo, updateComplete, updateTodo } from "../Controller/todocontroller.js";
export const todoRouter=express.Router();

todoRouter.get("/",getTodo)
todoRouter.post("/",AddTodo)
todoRouter.delete("/:id",deleteTodo)
todoRouter.patch("/:id",updateTodo)
todoRouter.patch("/hello/:id",updateComplete)