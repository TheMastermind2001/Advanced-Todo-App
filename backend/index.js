

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
    let token=req.headers.authorization;
    token=(token?.split(" "))[1];  //becuase it come like "Bearer .....token....."
    const payload=jwt.verify(token,jwtsecret);
    if(!payload){
        res.json({
            "msg":"Error occured wrong token"
        })
    }
    const createPayload=req.body;
    const parsePayload=createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            "msg":"You sent the wrong inputs"
        })
        return;
    }
    
    
    todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed:false
    }).then((todo)=>{
        
        user.findById(payload.id).then(user=>{
            
            user.Todos.push(todo);
            
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
    
    if(payload){
        user.findById(payload.id).then(result=>{
            
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

app.put("/completed/:id",async (req,res)=>{
    const updatePayload=req.body;
    // const parsePayload=updateTodo.safeParse(updatePayload);
    let token=req.headers.authorization;
    token=token.split(" ")[1];
    console.log(token);
    const id=req.params.id;
    const isCompleted=req.query.isCompleted;
    const payload=jwt.verify(token,jwtsecret);
    console.log("Payload",payload)
    if(payload){
        const user1=await user.findById(payload.id);
        if(user1){
            // const tododoc=await user1.Todos.findById(id);
            console.log("Ids",id);
            console.log("User",user1);
            let tododoc=null;
            for(let i=0;i<user1.Todos.length;i++){
                console.log("All IDs",user1.Todos[i]._id.toString());
                if(user1.Todos[i]._id.toString()===id){
                    tododoc=user1.Todos[i];break;
                }
            }
            if(tododoc){
                tododoc.completed=isCompleted;
                
                user1.save().then(()=>{
                    console.log("DONE");
                    tododoc.save().then().catch();
                    res.json({"msg":"Succesfull"});return;
                    
                })
                .catch((error)=>{console.log("Error 3",error)});
            }
            else{
                console.log("Error 4");
                res.json({"msg":"No doc with this id exists"})
                return;
            }
        }
        else{
            console.log("No user");
            return res.json({"msg":"No such user exists"});
        }
    }
    else{
        res.json({"msg":"Wrong token"});
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
                token=jwt.sign({username: username, id: doc._id},jwtsecret);
                res.json({
                    "token":token
                })
            }
        }
        if(!done){
            res.status(401).json({
                "msg":"Wrong credentials"
            })
        }
    }).catch(error=>{
        res.status(500).json({
            "message":"Server Error",
            "Error":error.toString()
        })
    })

})


app.delete("/delete/:id",async (req,res)=>{
    const updatePayload=req.body;
    // const parsePayload=updateTodo.safeParse(updatePayload);
    let token=req.headers.authorization;

    if(!token){
        return res.json({"msg":"No Token found"});
    }
    token=token.split(" ")[1];
    console.log(token);
    const id=req.params.id;
    const payload=jwt.verify(token,jwtsecret);
    if(payload){
        const user1=await user.findById(payload.id);
        for(let i=0;i<user1.Todos.length;i++){
            if(user1.Todos[i]._id.toString()===id){
                user1.Todos.splice(i, 1); 
                user1.save();
                break;
            }
        }
       
    }
    else{
        console.log("Error 6");
    }
    
});


app.listen(3000,()=>{
    console.log("Server running");
});