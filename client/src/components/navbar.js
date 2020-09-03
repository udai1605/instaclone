import React,{useContext} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
const NavBar =()=>{
  const {state,dispatch} = useContext(UserContext)
  const history=useHistory()
  const renderList=()=>{
    if(state){                     //to hide buttons when user is signed in .
      return [
        <li><Link to="/profile">Profile</Link></li>,
            <li><Link to='/CreatePost'>Add Post</Link></li>,
            <li><Link to='/myfollowingpost'>following posts</Link></li>,
            <li>
              <button className="btn waves-effect waves-light #64b5f6 red" 
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
              }}>
          Log Out
            
        </button>
        </li>
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