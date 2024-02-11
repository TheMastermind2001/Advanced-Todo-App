const mongoose=require("mongoose");
// const { Schema, boolean } = require("zod");

mongoose.connect("mongodb+srv://youtube:agniva2001@cluster0.vhyysbn.mongodb.net/test2");




const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed: Boolean
})

const userSchema=mongoose.Schema({
    username: String,
    password: String,
    Todos: [todoSchema]
})

const todo=mongoose.model('todos',todoSchema);
const user=mongoose.model('users',userSchema);

module.exports={todo,user};
