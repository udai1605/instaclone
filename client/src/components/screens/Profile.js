import React, {useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App'

const Profile = () => {
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setPics(result.mypost)
        })
     },[])
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            
            <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px",borderBottom :"1px solid grey"}}>
                <div >
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src="https://i.pinimg.com/originals/50/19/a4/5019a45312310170736410ee0361e942.jpg" alt="Profile Pic" />

                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{ display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h5>0 posts</h5>
                        <h5>0 followers</h5>
                        <h5>0 following</h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {
                    mypics.map(item =>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>

                        )
                    })
                }
                
                

            </div>
        </div>
    )
}

export default Profile;