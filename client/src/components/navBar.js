import React from 'react';
import { Link } from 'react-router-dom';
import { QUERY_PROFILE } from '../utils/queries';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
export default function Navbar() {
    const { loading, error, data } = useQuery(QUERY_PROFILE)
    
    console.log(data)
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        <nav className="navbar d-flex flex-row justify-content-end" style={{backgroundColor: "rgba(0, 0, 0, 0.8)"}} >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row   ">
                <Link to="/">
                    <li className="p-2">Home</li>
                </Link>
                {!data ?  
                <>
                <Link to="/login">  
                    <li className="p-2">Log In</li> 
                </Link>
                <Link to="/signup">  
                    <li className="p-2">Signup</li>
                </Link>
                </>
                
                    :
                <>
                <Link to="/profile">  
                    <li className="p-2">Profile</li>
                </Link>
                <Link to="/record">
                    <li className="p-2">Record Game</li>
                </Link>
                </>
                }
               
                
                <Link to="/stats">  
                    <li className="p-2">All Player Stats</li>
                </Link>
            </ul>
        </nav>
  );
}


