import { useEffect, useState } from 'react';
import './App.css';
import CreateTodos from './components/CreateTodos';
import Todos from './components/Todos';
import SignupScreen from './components/SignupScreen';
import {BrowserRouter as Router,RouterProvider,Routes,Route, useNavigate, Navigate} from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { UseDispatch } from 'react-redux';
import{login,logout} from './features/login/loginSlice';
import loginSlice from './features/login/loginSlice';
import {jwtDecode} from 'jwt-decode';
import Logout from './components/Logout';
function App() {
  // const navigate=useNavigate();
  const[newAdded,setNewAdded]=useState(0);
  // let user=useSelector(state=>state.login.user);
  const token1 = localStorage.getItem('token');
  let user=(token1)?jwtDecode(token1)?.username:null;
  const dispatch=useDispatch();
  const[allTodos,setAllTodos]=useState([]);
  const[isloggedin,setisloggedin]=useState(0);
  useEffect(()=>{
    const token1 = localStorage.getItem('token');

    if(!token1){
      user=null;
      console.log("No token");return;
    }
    const info=jwtDecode(token1);   //might fail if the token in the localstorage is not valid. So use try catch
    dispatch(login(info.username));
    // user=info.username;
    fetch("http://localhost:3000/todos",
    { 
      method: "GET",
      headers: {"Authorization": "Bearer "+localStorage.getItem('token')}
    }).then(result=>{
      if(!result.ok){
        console.log("ERROR ERROR ERROR");
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      return result.json();
    })
    .then(data=>{
      console.log(data["Todos"]);
      // console.log(data);
      setAllTodos(data["Todos"])
    })
    .catch(error=>{
      console.log("Error fetching",error);
    });
  },[newAdded,user,dispatch])  

  return (
    <Router>
    <div>
      <div className="main">
        <div className="main-screen">
          
          
          <h1>{user?"Hi "+user+", ":""}Welcome to Agniva's Todo Master</h1>
        
          <Routes>
            <Route path="/" element={

                <Navigate to={
                  user?
                  "/todos":"/signup"}>
                </Navigate>
              }></Route>
              
            <Route path="/signup" element={
                <div className="notloggedin-screen">
                <SignupScreen setisloggedin={setisloggedin}></SignupScreen>
              </div>}>
            </Route>  
          
            <Route path="/todos" element={
              user?
              (<div className="loggedin-screen">
              <Logout></Logout>
              <CreateTodos newTodo={setNewAdded} val={newAdded}></CreateTodos>
              {/* <div class="cool-line"></div> */}
              <Todos allTodos={allTodos}></Todos>
              </div>): <Navigate to="/signup"/>
            }>

            </Route>
      
            <Route path="*" element={<SignupScreen/>} />
          
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
