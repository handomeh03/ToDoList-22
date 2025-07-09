import express from "express";
import dotenv from "dotenv";
import { initdb } from "./db/connection.js";
import { todoRouter } from "./Router/TodoRouter.js";
import cors from "cors";
dotenv.config();

const port=process.env.PORT || 8000;

const app=express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}))

app.use((req,res,next)=>{
    console.log(req.url);
    console.log(req.method);
    next();
})
app.use("/api/todo",todoRouter)

initdb().then(()=>{
    app.listen(port,()=>{
        console.log("the server is run at "+port);
    })
}).catch((e)=>{
    console.log(e);
})

