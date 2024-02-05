import { useEffect, useState } from 'react';
import './App.css';
import CreateTodos from './components/CreateTodos';
import Todos from './components/Todos';
function App() {
  const[newAdded,setNewAdded]=useState(0);
  const[allTodos,setAllTodos]=useState([]);
  useEffect(()=>{
    fetch("http://localhost:3000/todos",
    {
      method: "GET",
    }).then(result=>{
      return result.json()
    })
    .then(data=>{
      console.log(data["Todos"]);
      // console.log(data);
      setAllTodos(data["Todos"])
    })
    .catch(error=>{
      console.log("Error fetching",error);
    });
  },[newAdded])

  return (
    <div>
      <div className="main">
        <div className="main-screen">
          <h1>Welcome to Agniva's Todo Master</h1>
          <CreateTodos newTodo={setNewAdded} val={newAdded}></CreateTodos>
          <Todos allTodos={allTodos}></Todos>
          
        </div>
        
      </div>
      <div className="fade"></div>
      <div className="fade1"></div>
      <div className="empty-space"></div>
    </div>
  );
}

export default App;
