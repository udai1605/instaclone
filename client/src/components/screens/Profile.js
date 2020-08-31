import React from 'react';


const Profile = () => {
    return (
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
            
            <div style={{ display: "flex", justifyContent: "space-around", margin: "18px 0px",borderBottom :"1px solid grey"}}>
                <div >
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px" }} src="https://i.pinimg.com/originals/50/19/a4/5019a45312310170736410ee0361e942.jpg" alt="Profile Pic" />

                </div>
                <div>
                    <h4>Udai kiran</h4>
                    <div style={{ display:"flex",justifyContent:"space-between",width:"108%"}}>
                        <h5>0 posts</h5>
                        <h5>0 followers</h5>
                        <h5>0 following</h5>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <img className="item" src="https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&w=1000&q=80" alt="gallery"/>
                <img className="item" src="https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&w=1000&q=80" alt="gallery"/>
                <img className="item" src="https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&w=1000&q=80" alt="gallery"/>
                <img className="item" src="https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&w=1000&q=80" alt="gallery"/>
                <img className="item" src="https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-1.2.1&w=1000&q=80" alt="gallery"/>

            </div>
        </div>
    )
}

export default Profile;