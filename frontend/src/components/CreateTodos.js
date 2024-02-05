import React, { useRef } from 'react'
import "../css/CreateTodos.css"
function CreateTodos({newTodo,val}) {

  const titleRef=useRef(null);
  const descRef=useRef(null);
  const handleonClick=(event)=>{
    const title=titleRef.current.value;
    const desc=descRef.current.value;
    console.log(title,desc);

    titleRef.current.value="";
    descRef.current.value="";

    fetch("http://localhost:3000/todo",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Length' is usually calculated and set by the browser
      },
      body: JSON.stringify({
        title:title,
        description:desc
      })
    }).then(()=>{
      newTodo(val+1);
      console.log("Successfully added Todo")
    }).catch((error)=>{
      console.log("Some Error Occured",error);
    })
      
  }
  return (
    <div className="create-todo-class">
        <div className="create-todo-components">
            <input ref={titleRef} className="todo-input" type="text" placeholder="Title"></input>
            <br></br>
            <input ref={descRef} className="todo-input" type="text" placeholder="Write Todo"></input>
            <br></br>
            <button onClick={(e)=>{
              handleonClick(e);
            }} className="create-todo-add-button">Add Todo</button>
        </div>
    </div>
  )
}

export default CreateTodos