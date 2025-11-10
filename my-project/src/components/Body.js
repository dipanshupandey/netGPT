import React, { useEffect } from 'react'
import { Outlet,useLocation,useNavigate } from 'react-router';
import Header from "./Header";
import {onAuthStateChanged } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';


const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const location=useLocation();
  useEffect(()=>{
   
    const unsubsribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName} = user;
        dispatch(addUser({uid,email,displayName}));
        if(location.pathname==="/gpt")
        navigate("/gpt");
        else
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return ()=>unsubsribe();
  },[]);
  return (
    <div className=''>
    <Header/>
    <Outlet/>
    </div>
  )
}

export default Body