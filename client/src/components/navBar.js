import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

export default function Navbar() {
    
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        <nav className="navbar   d-flex flex-row justify-content-end" style={{backgroundColor: "rgba(0, 0, 0, 0.8)"}} >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row   ">
                <Link to="/">
                    <li class="p-2">Home</li>
                </Link>
                <Link to="/login">  
                    <li class="p-2">Log In</li> 
                </Link>
                <Link to="/signup">  
                    <li class="p-2">Signup</li>
                </Link>
                <Link to="/profile">  
                    <li class="p-2">Profile</li>
                </Link>
                <Link to="/stats">  
                    <li class="p-2">All Player Stats</li>
                </Link>
            </ul>
        </nav>
  );
}


