import React from 'react';
import {Link} from 'react-router-dom'

const Signin = () => {
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 className="brand-logo">Instapeople</h2>
                <input type="text"  placeholder="email" />
                <input type="text"   placeholder="password" />

                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2">
                    Sign In
                    
                </button>
                <h5>
                    <Link to="/signin">Don't have an account ?</Link>
                </h5>

            </div>
        </div>
    )
}

export default Signin;