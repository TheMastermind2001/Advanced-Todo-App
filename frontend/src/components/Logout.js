import React from 'react'
import "../css/Logout.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { UseDispatch } from 'react-redux';
import { logout } from '../features/login/loginSlice';
function Logout() {
  const user=useSelector(state=>state.login.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  return (
    <div className="logout-head">
        <button 
        onClick={()=>{
            localStorage.removeItem('token');
            dispatch(logout());
            navigate('/signup')
        }}
        className="logout-button">
            LOG OUT
        </button>
    </div>
  )
}

export default Logout;