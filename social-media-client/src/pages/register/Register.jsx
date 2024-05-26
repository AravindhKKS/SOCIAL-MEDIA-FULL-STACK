import { useRef } from "react";
import "./register.css";
import axios from 'axios' 
import {useNavigate} from 'react-router-dom'

export default function Register() {
  const username = useRef()
  const password = useRef()
  const email= useRef()
  const againPassword = useRef() 
  const navigate = useNavigate()
  const BASE_URL = process.env.REACT_APP_BASE_URL

  const handleSubmit =async (e) => {
    e.preventDefault();
  if(againPassword.current.value !== password.current.value){
againPassword.current.setCustomValidity("Password doesn't match!")
  }else{
   const user =  {
      username:username.current.value,
      password:password.current.value,
      email:email.current.value
    }
    try{
    await axios.post(BASE_URL + '/auth/register',user)
    navigate('/login')
    }catch(err){
      console.log(err)
    }
  }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">kks-social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight" >
          < form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Username" type="text" ref={username} required className="loginInput" />
            <input placeholder="Email" type="email" ref={email} required className="loginInput" />
            <input placeholder="Password" type="password"  ref={password} required  className="loginInput" minLength='5'  />
            <input placeholder="Password Again" type="password" ref={againPassword}  required  className="loginInput"  minLength='5'/>
            <button type="submit" className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
        </form>
          </div>
      </div>
    </div>
  );
}
