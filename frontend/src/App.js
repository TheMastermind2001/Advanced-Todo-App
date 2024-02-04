import { useEffect } from 'react';
import './App.css';
import CreateTodos from './components/CreateTodos';
import Todos from './components/Todos';
function App() {

  useEffect(async ()=>{
    const res=await fetch("localhost:3000/todos",
    {
      method: "GET"
    })
  },[])

  return (
    <div>
      <div className="main">
        <div className="main-screen">
          <h1>Welcome to Agniva's Todo Master</h1>
          <CreateTodos></CreateTodos>
          <Todos></Todos>
        </div>
        
      </div>
      <div className="fade"></div>
      <div className="fade1"></div>
    </div>
  );
}

export default App;
