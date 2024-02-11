import React from 'react'
import '../css/Todos.css'

function Todos({allTodos}) {
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
                  <h1 className="todo-list-element-item"></h1>
                  <h1 className="todo-list-element-item"></h1>
                </div>
              )
            })}
          </div>
    </div>
  )
}

export default Todos