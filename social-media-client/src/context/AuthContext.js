import { createContext, useReducer } from "react"
import {AuthReducer} from './AuthReducer'

const INITIAL_STATE = {
    user:{
        _id:"6630934a860ab14a38f71d95",
        username:"aravinth",
        email:"aravinth@gmail.com",
        password:"$2b$10$S1NMG/opvOEJBud0k7kkNOBc4L59ssdbwQj6RYtWFZ7M0FBDQVyOa",
        coverPicture:"",
        profilePicture:"",
        followers:["66309364860ab14a38f71d97"],
        followings:[],
        desc:"It's my first post",
        city:"kumbakonam",
        from:"karuppur",
        isAdmin:false,
        relationship:1
    },
    isFetching:false,
    error:false
}


export  const AuthContext = createContext(INITIAL_STATE)

 const  AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE)
    return(
       <AuthContext.Provider
       value={{
        user:state.user,
        isFetching:state.isFetching,
        error:state.error,
        dispatch
       }}
       >
        {children}
       </AuthContext.Provider> 
    )
}

export default AuthContextProvider