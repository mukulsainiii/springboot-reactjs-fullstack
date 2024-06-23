import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
function HeaderComponent(){
  const {isAuthenticated,logout}=useAuth();
  const handlelogout=()=>{
    logout();
  }
    return(
      <header className='header'>
         <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <ul className='navbar-nav'>
            <li className='nav-item'>
            {isAuthenticated && <Link className='nav-link' to={'/welcome/mukul'}>Home</Link>} </li>
            <li className='nav-item'>
            {isAuthenticated && <Link className='nav-link' to={'/todos'}>Todos</Link>} </li>
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
            <li className='nav-item'>
            {isAuthenticated && <Link className='nav-link' to={'/logout'} onClick={handlelogout}>Logout</Link>}</li>
            <li className='nav-item'>
            {!isAuthenticated && <Link  className='nav-link' to={'/login'}>Login</Link>}</li>
            </ul><hr/></nav>
      </header>
    )
  }
  export default HeaderComponent;