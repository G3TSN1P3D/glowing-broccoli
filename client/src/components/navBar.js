import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

export default function Navbar() {
    
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        <nav className='navbar'>
            <ul className='nav-links'>
                <Link to="/">
                    <li>Home</li>
                </Link>
                <Link to="/login">  
                    <li>Log In</li> 
                </Link>
                <Link to="/signup">  
                    <li>Signup</li>
                </Link>
                <Link to="/profile">  
                    <li>Profile</li>
                </Link>
                <Link to="/stats">  
                    <li>All Player Stats</li>
                </Link>
            </ul>
        </nav>
  );
}


