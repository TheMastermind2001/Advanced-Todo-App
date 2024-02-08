

const express=require("express");
const cors = require('cors');
const jwtsecret="secret";
const{createTodo,updateTodo}=require("./types");

const app=express();

const {todo,user}=require("./db")

app.use(express.json());

const jwt=require("jsonwebtoken");

app.use(cors({
    origin: 'http://localhost:3001'
}));

app.post("/todo",(req,res)=>{
    console.log(req);
    let token=req.headers.authorization;
    console.log(token);
    token=(token?.split(" "))[1];  //becuase it come like "Bearer .....token....."
    const payload=jwt.verify(token,jwtsecret);
    console.log(payload);
    if(!payload){
        res.json({
            "msg":"Error occured wrong token"
        })
    }
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
    }).then((todo)=>{
        console.log(todo);
        user.findById(payload.id).then(user=>{
            console.log(user);
            user.Todos.push(todo);
            console.log(user);
            user.save().then(()=>{
                res.json({
                    "msg":"Done"
                })
            }).catch()
            
        }).catch((error)=>{
            console.log("Error creating Todo",error);
        })

        // res.json({
        //     msg:"Todo Created"
        // })
    }).catch((error)=>{
        console.log("Error creating Todo",error);
    });
})

app.get("/todos",(req,res)=>{     //check if the jwt.verify was being done inside the middleware
    
    let token=req.headers.authorization;
    token=token.split(" ")[1];  //becuase it come like "Bearer .....token....."
    const payload=jwt.verify(token,jwtsecret);
    console.log(payload);
    if(payload){
        user.findById(payload.id).then(result=>{
            console.log(result.Todos);
            res.json({
               Todos: result.Todos 
            })
        }).catch({
            msg: "Error occured"
        })
    }
    else{
        console.log("Error Occured");
    }
    
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

app.post("/signup",(req,res)=>{    //dont forget to implement the middleware and zod
    const username=req.body.username;
    const pwd=req.body.password;

    user.create({
        username:username,
        Todos:[]
    }).then((doc)=>{
        token=jwt.sign({username: username, id: doc._id},jwtsecret);
        res.json({
            "token":token
        })
    }).catch();
    
    // res.json({
    //     "token":token
    // })

})



app.listen(3000,()=>{
    console.log("Server running");
});