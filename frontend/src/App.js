import { useEffect, useState } from 'react';
import './App.css';
import CreateTodos from './components/CreateTodos';
import Todos from './components/Todos';
import SignupScreen from './components/SignupScreen';
import {BrowserRouter as Router,RouterProvider,Routes,Route, useNavigate, Navigate} from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

function App() {
  // const navigate=useNavigate();
  const[newAdded,setNewAdded]=useState(0);
  const[allTodos,setAllTodos]=useState([]);
  const[isloggedin,setisloggedin]=useState(0);
  useEffect(()=>{
    const token1 = localStorage.getItem('token');
    if(!token1){
      console.log("No token");return;
    }
    fetch("http://localhost:3000/todos",
    { 
      method: "GET",
      headers: {"Authorization": "Bearer "+localStorage.getItem('token')}
    }).then(result=>{
      if(!result.ok){
        console.log("ERROR ERROR ERROR");
        throw new Error(`HTTP error! status: ${result.status}`);
      }
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
    <Router>
    <div>

      <div className="main">
        <div className="main-screen">
          
          <h1>Welcome to Agniva's Todo Master</h1>
          
          <Routes>
            <Route path="/" element={
                <Navigate to={
                  isloggedin?
                  "/todos":"/signup"}>
                </Navigate>
              }></Route>
              
            <Route path="signup" element={
                <div className="notloggedin-screen">
                  <SignupScreen></SignupScreen>
                </div>
              }>
            </Route>  
          
            <Route path="todos" element={
              <div className="loggedin-screen">
              <CreateTodos newTodo={setNewAdded} val={newAdded}></CreateTodos>
              <Todos allTodos={allTodos}></Todos>
              </div>
            }>

            </Route>
          
          </Routes>

        </div>
        
      </div>
      <div className="fade"></div>
      <div className="fade1"></div>
      <div className="empty-space"></div>
    </div>
    </Router>
  );
}

export default App;
