import React, { useState, useEffect,useContext } from 'react';
import {UserContext} from '../../App'

const Home = () => {
    const [data, setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(() => {
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
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
                  if(item._id==result._id){
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
                if(item._id==result._id){
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
    return (
        <div className="home">
            {
                data.map(item => {
                    return (
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
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
                                <input type="text" placeholder="Comment" />
                            </div>
                        </div>
                    )
                })
            }


        </div>
    )
}



export default Home;