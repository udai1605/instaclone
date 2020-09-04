import React, { useEffect, createContext, useReducer,useContext } from 'react';
import NavBar from './components/navbar.js'
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import FollowingUserPosts from './components/screens/followedUserPost'
import { reducer, initialState } from './reducers/userReducer'
import Reset from './components/screens/Reset'
import Newpassword from './components/screens/Newpassword'
export const UserContext = createContext()



const Routing = () => {     //to make sure atleast one route is active switch is used.
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){                                   //to prevent access without signin or signup
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push('/signin')
    }
  },[])
  return (
    <Switch>
      <Route exact path='/'>
        <Home />

      </Route>
      <Route path='/signin'>
        <Signin />
      </Route>
      <Route path='/signup'>
        <Signup />
      </Route>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route path='/CreatePost'>
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
       <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
       <FollowingUserPosts />
      </Route>
      <Route exact path="/reset">
       <Reset />
      </Route>
      <Route path="/reset/:token">
         <Newpassword />
      </Route>
    </Switch>

  )
}



function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
