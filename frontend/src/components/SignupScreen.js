import React, { useEffect, useRef } from 'react'
import "../css/SignupScreen.css"
import { useNavigate } from 'react-router-dom';

import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import{login,logout} from '../features/login/loginSlice';
import loginSlice from '../features/login/loginSlice';
import jwtDecode from 'jwt-decode';
import { useState } from 'react';

function SignupScreen({setisloggedin}) {
  const user=useSelector(state=>state.login.user);
  const dispatch=useDispatch();
  const userref=useRef(null);
  const pwdref=useRef(null);
  const navigate=useNavigate();
  const [errormsg,seterrormsg]=useState("");
  const handleClick=()=>{
    const username=userref.current.value;
    const pwd=pwdref.current.value;
    console.log(username,pwd);
    fetch("http://localhost:3000/signup",
    {
      method:"POST",
      headers: { // You need to include headers to specify the content type
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "username":username,
        "password":pwd
      })
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if(data.msg){
        seterrormsg(data.msg);
        return;
      }
      console.log(data.token);
      localStorage.setItem('token',data.token);
      // setisloggedin(1);
      dispatch(login(username));
      navigate("/todos");
    }).catch((error)=>{
      console.log("Error occured",error);
    });
  }

  const handleClickIn=()=>{
    const username=userref.current.value;
    const pwd=pwdref.current.value;
    console.log(username,pwd);
    fetch("http://localhost:3000/signin",
    {
      method:"POST",
      headers: { // You need to include headers to specify the content type
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "username":username,
        "password":pwd
      })
    }).then(response=>{
      return response.json();
    }).then(data=>{
      if(data.msg){
        seterrormsg(data.msg);
        return;
      }
      console.log(data.token);
      localStorage.setItem('token',data.token);
      // setisloggedin(1);
      dispatch(login(username));
      navigate("/todos");
    }).catch((error)=>{
      console.log("Error occured",error);
    });
  }



  useEffect(()=>{
    window.addEventListener('click', ()=>{
      seterrormsg("");
    });
  },[])

  // const handleClick1=()=>{
  //   navigate("/todos");
  // }

  return (
    <div>
        <div className="signup-inputs">
            <input ref={userref} className="signup-input" type="text" placeholder="Username"></input>
            <input ref={pwdref} className="signup-input" type="text" placeholder="Password"></input>
            <div className="sign-buttons">
              <button onClick={
                ()=>{
                  handleClick();
                }
              } className="signup-button">Sign Up</button>
              <h1>/</h1>
              <button onClick={
                ()=>{
                  handleClickIn();
                }
              } className="signin-button">Sign In</button>
            </div>
            <div className="errorMessage">
              <h4>{errormsg}</h4>
            </div>
        </div>
    </div>
  )
}

export default SignupScreen