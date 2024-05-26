import "./login.css";
import { useContext, useRef } from "react";
import { loginCalls } from "../../apiCalles";
import {AuthContext} from '../../context/AuthContext'
import {CircularProgress} from "@material-ui/core"


export default function Login() {
  const email = useRef()
  const password = useRef()
const {isFetching, dispatch} = useContext(AuthContext)
const handleSubmit = (e) => {
e.preventDefault()
loginCalls({email:email.current.value, password:password.current.value}, dispatch)
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
        <div  className="loginRight" >
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Email" type="email" ref={email} required className="loginInput" />
            <input placeholder="Password" type='password' minLength='3' ref={password} required className="loginInput" />
            <button type="submit" className="loginButton">{isFetching ? <CircularProgress  color="inherit" size='25px'/> : "Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button  className="loginRegisterButton">
              {isFetching ?<CircularProgress color="inherit" size='25px' /> : "Create a New Account"}
            </button>
        </form>
          </div>
      </div>
    </div>
  );
}
