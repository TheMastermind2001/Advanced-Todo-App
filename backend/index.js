

const express=require("express");
const cors = require('cors');

const{createTodo,updateTodo}=require("./types");

const app=express();

const {todo}=require("./db")

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001'
}));

app.post("/todo",(req,res)=>{
    const createPayload=req.body;
    console.log(createPayload);
    const parsePayload=createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            "msg":"You sent the wrong inputs"
        })
        return;
    }
    todo.create({
        title: createPayload.title,
        description: createPayload.description
    }).then(()=>{
        res.json({
            msg:"Todo Created"
        })
    }).catch((error)=>{
        console.log("Error creating Todo",error);
    });
})

app.get("/todos",(req,res)=>{
    todo.find({}).then(result=>{
        console.log(result);
        res.json({
           Todos:result 
        })
    }).catch({
        msg: "Error occured"
    })
})

app.put("/completed",(req,res)=>{
    const updatePayload=req.body;
    const parsePayload=updateTodo.safeParse(updatePayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg:"Wrong input"
        })
        return;
    }  
})



app.listen(3000,()=>{
    console.log("Server running");
});