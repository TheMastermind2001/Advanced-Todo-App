

const express=require("express");
const cors = require('cors');
const jwtsecret="secret";
const{createTodo,updateTodo,userZod}=require("./types");
const zod=require("zod");

const app=express();

const {todo,user}=require("./db")

app.use(express.json());

const jwt=require("jsonwebtoken");

app.use(cors({
    origin: 'http://localhost:3001'
}));

const bcrypt=require("bcrypt");

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
    console.log("Payload",payload);
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

app.post("/signup",async (req,res)=>{    //dont forget to implement the middleware and zod
    const username=req.body.username;
    const pwd=req.body.password;
    const hashedpwd=await bcrypt.hash(pwd, 10);
    const result=userZod.safeParse({username:username,password:pwd})
    user.findOne({username:username}).then(user1=>{
        // console.log(user);
        if(user1){
            console.log("User exists: ", user1);
            return res.status(400).json({
                msg: "Username already exists"
            });
        }
        else{
            user.create({
                username:username,
                password:hashedpwd,
                Todos:[]
            }).then((doc)=>{
                token=jwt.sign({username: username, id: doc._id},jwtsecret);
                res.json({
                    "token":token
                })
            }).catch();
        }
    })
    if(!result.success){
        result.error.errors.forEach((error) => {
            console.log(`${error.path[0]}: ${error.message}`);
        });
        return;
    }
    

})

app.post("/signin",async (req,res)=>{    //dont forget to implement the middleware and zod
    const username=req.body.username;
    const pwd=req.body.password;
    user.find({username:username}).then(async (docs)=>{
        
        let done=false;
        for(let doc of docs){
            if(done)break;
            const match = await bcrypt.compare(pwd, doc.password);
            if(match){
                done=true;
                res.json({
                    "message": "Successfull Sign In"
                })
            }
        }
        if(!done){
            res.status(401).json({
                "message":"Wrong credentials"
            })
        }
    }).catch(error=>{
        res.status(500).json({
            "message":"Server Error",
            "Error":error.toString()
        })
    })

})



app.listen(3000,()=>{
    console.log("Server running");
});