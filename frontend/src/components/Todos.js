import React from 'react'

function Todos({allTodos}) {
  return (
    <div className="todos-div">
        <div className="todo-list">
            {allTodos.map((todo,index)=>{
              return(
                <div key={index} className="todo-list-element">
                  <h1 className="todo-list-element-item">{index+1}</h1>
                  <h1 className="todo-list-element-item">{todo.title}</h1>
                  <h1 className="todo-list-element-item">{todo.description}</h1>
                </div>
              )
            })}
          </div>
    </div>
  )
}

export default Todos