import React, { useRef, useState } from 'react'
import {BrowserRouter , Routes , Route, Navigate, useNavigate, useParams, Link } from 'react-router-dom'
import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './Todo/ListTodosComponent';
import WelcomeComponent from './Todo/WelcomeComponent';
import ErrorComponent from './ErrorComponent';
import { AuthProvider, useAuth } from './AuthContext';
import TodoComponent from './Todo/TodoComponent';
function TodoApp() {
  function AuthenticatedRoute({children}){
    const{isAuthenticated}=useAuth();
    if(isAuthenticated){
    return children;
    }
    return <Navigate to='/'></Navigate>
  }
  return (
  <div className='TodoApp'>
    <AuthProvider>
     <BrowserRouter>
       <HeaderComponent/>
       <Routes>
            <Route path='/' element={<LoginComponent/>}></Route>
            <Route path='/login' element={<LoginComponent/>}></Route>
            <Route path='/welcome/:username' element={
            <AuthenticatedRoute><WelcomeComponent/></AuthenticatedRoute>}></Route>
            <Route path='/todos' element={
            <AuthenticatedRoute><ListTodosComponent/></AuthenticatedRoute>}></Route>
            <Route path='/logout' element={
            <AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute>}></Route>
            <Route path='/todo/:id' element={<AuthenticatedRoute><TodoComponent/></AuthenticatedRoute>}></Route>
            <Route path='*' element={<ErrorComponent/>}></Route>
        </Routes>
       <FooterComponent/>
     </BrowserRouter>
   </AuthProvider>
  </div> 
       )
}
export default TodoApp;

function LoginComponent(){
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const[showErrorMessage,setShowErrorMessage]=useState(false)
  const passwordRef=useRef(null);
  const navigate=useNavigate();
  const {login}=useAuth();
  const handlekeypress=(event,field)=>{
    if(event.key=='Enter'){
    event.preventDefault();
    if(field==='username'){
      passwordRef.current.focus();
    }
    if(field==='password'){
      handleSubmit(event)
    }
  }
  }
  const handleUsernameChange=(event)=>{
    setUsername(event.target.value);
  }
  const handlePasswordChange=(event)=>{
    setPassword(event.target.value)

  }
  async function handleSubmit(event){
    event.preventDefault();
    if(await login(username,password)){
      setUsername('')
      setPassword('')
      navigate(`/welcome/${username}`);
    }
    else{
      setShowErrorMessage(true)
      setUsername('')
      setPassword('')
    }
  }
  const handlefocus=()=>{
    setShowErrorMessage(false)
  }

    return(
    <div className='Login'>
     {showErrorMessage && <div className='errorMessage'>Authentication failed</div>}
        <div className='LoginForm'>
          <form className='loginForm'>
            <label>UserName:</label>
            <input type='text' name='username' 
            value={username} onChange={handleUsernameChange}
            onKeyPress={(event)=>handlekeypress(event,'username')}
            onFocus={handlefocus}></input><br></br>
            <label>Password</label>
            <input type='password' name='password' 
            value={password} onChange={handlePasswordChange}
            ref={passwordRef} onKeyDown={(event)=>handlekeypress(event,'password')}/><br></br>
            <input type='submit' name='submit' onClick={handleSubmit}></input>
            </form>
        </div>
    </div>
    )
}


