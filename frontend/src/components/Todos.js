import React, { useRef } from 'react'
import '../css/Todos.css'
import { useEffect } from 'react';


function Todos({allTodos,setNewAdded,newAdded}) {

  const handleCheck=(event,id)=>{
    const result=event.target.checked;
    console.log( localStorage.getItem('token'));
    fetch("http://localhost:3000/completed/"+id+"?isCompleted="+result,{
      method: "PUT",
      headers: {
        "authorization": "Bearer "+localStorage.getItem('token')
      }
    }).then(()=>{
      setNewAdded(newAdded+1);
      console.log("Updated");
      return;
      // return;
    }).catch();
    // console.log(inputRefs[index].current.value);
  }


  const handleDelete=(event,id)=>{
    fetch("http://localhost:3000/delete/"+id,{
      method:"DELETE",
      headers:{
        "authorization": "Bearer "+localStorage.getItem('token')
      }
    }).then(()=>{
      setNewAdded(newAdded+1);
      console.log("Deleted");return;
    }).catch();
  }
  return (
    <div className="todos-div">
        <div className="title-list">
            <div className="table-titles">
              <h1 className="todo-list-element-item">No</h1>
              <h1 className="todo-list-element-item">Title</h1>
              <h1 className="todo-list-element-item">Description</h1>
              <h1 className="todo-list-element-item">Completed</h1>
              <h1 className="todo-list-element-item">Delete</h1>  
            </div>
        </div>
        <div className="todo-list">
            {allTodos.map((todo,index)=>{
              return(
                <div key={index} className="todo-list-element">
                  <h1 className="todo-list-element-item">{index+1}</h1>
                  <h1 className="todo-list-element-item">{todo.title}</h1>
                  <h1 className="todo-list-element-item">{todo.description}</h1>
                  
                  <label class="custom-checkbox">
                    <input onChange={(e)=>{
                      handleCheck(e,todo._id);
                    }} 
                    type="checkbox" id="myCheckbox" hidden 
                    checked={todo.completed}
                    />
                      <span class="checkmark"></span>
                      
                  </label>

                  <img onClick={(e)=>{
                    handleDelete(e,todo._id);
                  }} className="todo-list-element-item delete-img"src="https://www.svgrepo.com/show/511788/delete-1487.svg"></img>
                </div>
              )
            })}
          </div>
    </div>
  )
}

export default Todos


{/* <h1 className="todo-list-element-item"></h1> */}
                  {/* <h1 className="todo-list-element-item"></h1> */}

                  {/* <div class="todo-list-element-item checkbox-wrapper-23">
                    <input type="checkbox" id="check-23"/>
                    <label for="check-23" style={{ '--size': '30px' }}>
                    <svg viewBox="0,0,50,50">
                      <path d="M5 30 L 20 45 L 45 5"></path>
                    </svg>
                    </label>
                  </div> */}