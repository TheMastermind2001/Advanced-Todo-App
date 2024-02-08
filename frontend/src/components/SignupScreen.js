import React, { useRef } from 'react'
import "../css/SignupScreen.css"

function SignupScreen() {
  const userref=useRef(null);
  const pwdref=useRef(null);
  const handleClick=(e)=>{
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
      console.log(data.token);
      localStorage.setItem('token',data.token);
    }).catch((error)=>{
      console.log("Error occured",error);
    });
  }

  return (
    <div>
        <div className="signup-inputs">
            <input ref={userref} className="signup-input" type="text" placeholder="Username"></input>
            <input ref={pwdref} className="signup-input" type="text" placeholder="Password"></input>
            <button onClick={
              ()=>{
                handleClick();
              }
            } className="signup-button">Sign Up</button>
        </div>
    </div>
  )
}

export default SignupScreen