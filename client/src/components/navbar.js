import React,{useContext,useRef,useEffect,useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from'materialize-css'
const NavBar =()=>{
  const searchModel = useRef(null)
  const [search,setSearch]=useState("")
  const [userDetails,setUserDetails]=useState([])
  const {state,dispatch} = useContext(UserContext)
  const history=useHistory()
  useEffect(() => {
       M.Modal.init(searchModel.current)
  },[])




  const renderList=()=>{
    if(state){                     //to hide buttons when user is signed in .
      return [
        <ul key="z" className="navbar">
        <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{color: 'black'}}>search</i></li>,
        <li key="2"><Link to="/profile">Profile</Link></li>,
            <li key="3"><Link to='/CreatePost'>Add Post</Link></li>,
            <li key="4"><Link to='/myfollowingpost'>FollowingUser Posts</Link></li>,
            <li key="5">
              <button className="btn waves-effect waves-light #64b5f6 red" 
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                history.push('/signin')
              }}>
          Log Out
            
        </button>
        </li>
        </ul>,

<ul key="a" className="navbarmobile">
<li key="b"><i data-target="modal1" className="large material-icons modal-trigger" style={{color: 'black'}}>search</i></li>,
<li key="c"><Link to="/profile"><i className="large material-icons modal-trigger" style={{color: 'black'}}>account_circle</i></Link></li>,
    <li key="d"><Link to='/CreatePost'><i  className="large material-icons modal-trigger" style={{color: 'black'}}>add_a_photo</i></Link></li>,
    <li key="e"><Link to='/myfollowingpost'><i  className="large material-icons modal-trigger" style={{color: 'black'}}>public
</i></Link></li>,
    <li key="f">
      <button className="logout"
      onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push('/signin')
      }}>
  <i className="fa fa-sign-out"></i></button>
</li>
</ul>
      ]
    }else{
      return[
        <li key="6"><Link to="/signin">Signin</Link></li>,
            <li key="7"><Link to="/signup">Signup</Link></li>
      ]
    }
  } 

  const fetchUsers = (query)=>{
    setSearch(query)
    fetch('search-users',{
      method:"post",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results=>{
      setUserDetails(results.user)
      // console.log(results)
    })
  }

    return(
        <nav>
        <div className="nav-wrapper white" >
          <Link to={state?"/":"/signin"} className="brand-logo left">Instapeople</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
        <div id="modal1" className="modal" ref={searchModel} style={{color:'black'}}>
          <div className="modal-content">
            <input type="text"  placeholder="search users" value={search} onChange={(e)=>fetchUsers(e.target.value)}/>
            <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModel.current).close()
                   setSearch('')
                 }}><li key={item._id} className="collection-item">{item.name} - {item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={() =>setSearch('')}>Close</button>
          </div>
        </div>
      </nav>
            
    )
}
export default NavBar;