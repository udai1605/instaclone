import React, { useState, useEffect,useContext } from 'react';
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home = () => {
    const [data, setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(() => {
        fetch('/getfollowpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                setData(result.posts)
            })
    }, [])
      const likePost = (id) => {
          fetch('/like',{
              method: 'PUT',
              headers:{
                  "content-type": "application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body: JSON.stringify({
                  postId: id
              })
          }).then(res=> res.json())
          .then(result=>{
              const newData=data.map(item=>{
                  if(item._id===result._id){
                      return result
                  }else{
                      return item
                  }
              })
              setData(newData)
             
          }).catch(err=>{
              console.error(err)
          })
      }
      const dislikePost = (id) => {
        fetch('/unlike',{
            method: 'PUT',
            headers:{
                "content-type": "application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res=> res.json())
        .then(result=>{
            const newData=data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
           
        }).catch(err=>{
            console.error(err)
        })
    }
    const makeComment = (text,postId)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            const newData = data.map(item=>{
              if(item._id===result._id){
                  return result
              }else{
                  return item
              }
           })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  }
  const deletePost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        // console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setData(newData)
    })
}
    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <div style={{display: "inline-block",marginLeft:"5px",padding:"10px"}}>
                            <img
                            style={{ width: "35px", height: "35px", borderRadius: "80px" }}
                            src={item.postedBy.pic}
                            alt="Profile Pic" />
                            </div>
                            <h5 style={{display: "inline-block",marginLeft:"8px"}}><Link to={item.postedBy._id !== state._id?'/profile/'+item.postedBy._id:'/profile/'}>{item.postedBy.name}</Link>{item.postedBy._id === state._id //to make sure only the person who posted it will be able to delete it
                            && <i className="material-icons" style={{
                                float:"right"
                            }} onClick={()=>deletePost(item._id)} >delete</i>}</h5>

                            <div className="card-image">
                                <img src={item.photo} alt="post" />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                {item.likes.includes(state._id)   //to make sure the user can-not like same post again and again
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{dislikePost(item._id)}}
                              >thumb_down</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            }
                                
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return(
                                            <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> <span> : </span>{record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                                
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}



export default Home;