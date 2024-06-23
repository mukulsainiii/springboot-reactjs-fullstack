import { createContext, useContext, useState } from "react";
import { apiClient, executeBasicAuthenticationService } from "./Todo/API/HelloWorldApi";
export const AuthContext= createContext();
export const useAuth=()=> useContext(AuthContext);

export function AuthProvider({children}){
    const[isAuthenticated,setAuthenticated]=useState(false);
    const[username,setUsername]=useState();
    const[token,setToken]=useState();
   async function login(username,password){
      const baToken='Basic '+window.btoa(username+":"+password)
      try{
        const response=await executeBasicAuthenticationService(baToken)
        if(response.status===200){
          setAuthenticated(true)
          setUsername(username)
          setToken(baToken)
          apiClient.interceptors.request.use(
            (config)=>{
              console.log("adding a token")
              config.headers.Authorization=baToken
              return config;
            }
          )
          return true;
        }
        else{
          setAuthenticated(false)
          setUsername(null)
          setToken(null)
          return false;
    }
  }
  catch(error){
    setAuthenticated(false)
    setUsername(null)
    setToken(null)
   return false;
  }
    }
    function logout(){
        setAuthenticated(false)
    }
    return(
        <AuthContext.Provider value={{isAuthenticated,setAuthenticated,login,logout,username,token}}>
            {children}
        </AuthContext.Provider>
    )
}