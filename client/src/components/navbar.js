import React,{useContext} from 'react';
import {Link}from 'react-router-dom'
import {UserContext} from '../App'
const NavBar =()=>{
  const {state,dispatch} = useContext(UserContext)
  const renderList=()=>{
    if(state){                     //to hide buttons when user is signed in .
      return [
        <li><Link to="/profile">Profile</Link></li>,
            <li><Link to='/CreatePost'>Add Post</Link></li>
      ]
    }else{
      return[
        <li><Link to="/signin">Signin</Link></li>,
            <li><Link to="/signup">Signup</Link></li>
      ]
    }
  }
    return(
        <nav>
        <div className="nav-wrapper white" >
          <Link to={state?"/":"/signin"} className="brand-logo left">Instapeople</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
            
    )
}
export default NavBar;