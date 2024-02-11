const zod=require("zod");

const createTodo=zod.object({
    title: zod.string(),
    description: zod.string()
})


const updateTodo=zod.object({
    id:zod.string()
})

const userZod=zod.object({
    username: zod.string(),
    password: zod.string().min(2,"Password must be atleast 2 characters long")
})

module.exports={
    createTodo,
    updateTodo,
    userZod
}