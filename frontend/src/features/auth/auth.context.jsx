import { createContext,useState,useEffect } from "react";
import {login,register,getMe} from "./services/auth.api"

export const AuthContext = createContext()

export function AuthProvider({children}){
  const [user,setUser] = useState(null)
  const [loading,setLoading]=useState(false)

  const handleLogin = async (userName,password) =>{
    setLoading(true)
    try{
      const response = await login(userName,password)
      setUser(response.user)
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  const handleRegister = async (userName,email,password) =>{
    setLoading(true)
    try{
      const response = await register(userName,email,password)
      setUser(response.user)
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  return(
    <AuthContext.Provider value={({user,loading,handleLogin,handleRegister})}>
      {children}
    </AuthContext.Provider>
  )


}