const mongoose=require("mongoose");
const { Schema, boolean } = require("zod");

mongoose.connect("mongodb+srv://youtube:agniva2001@cluster0.vhyysbn.mongodb.net/test1");

const todoSchema=mongoose.Schema({
    title:String,
    description:String,
    completed: Boolean
})

const todo=mongoose.model('todos',todoSchema);

module.exports={todo};
