import React from 'react'
import "../css/CreateTodos.css"
function CreateTodos() {
  return (
    <div className="create-todo-class">
        <div className="create-todo-components">
            <input className="todo-input" type="text" placeholder="Title"></input>
            <br></br>
            <input className="todo-input" type="text" placeholder="Write Todo"></input>
            <br></br>
            <button className="create-todo-add-button">Add Todo</button>
        </div>
    </div>
  )
}

export default CreateTodos