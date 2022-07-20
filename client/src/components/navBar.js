import React from 'react';
import { Link } from 'react-router-dom';
import { QUERY_PROFILE } from '../utils/queries';
import Auth from '../utils/auth';
import {  useQuery } from '@apollo/client';
export default function Navbar() {
    const { data } = useQuery(QUERY_PROFILE)
    const useLogout = () => {
        Auth.logout();
      };


    return (
        <nav className="sticky-top" style={{backgroundColor: "rgba(0, 0, 0, 0.8)"}} >
            <div className='navbar d-flex flex-row justify-content-space-between'>
                <h1 className='text-primary'>Slugger Stats</h1>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row flex-wrap">
                    <Link to="/">
                    <button type="button" className="btn btn-primary btn-sm m-1">Home</button>
                    </Link>
                    {!data ?  
                    <>
                    <Link to="/login">  
                    <button type="button" className="btn btn-primary btn-sm m-1">Login</button>
                    </Link>
                    <Link to="/signup">  
                    <button type="button" className="btn btn-primary btn-sm m-1">Sign Up</button>
                    </Link>
                    </>
                    
                    :
                    <>
                    <Link to="/profile">  
                    <button type="button" className="btn btn-primary btn-sm m-1">Profile</button>
                    </Link>
                    <Link to="/record">
                    <button type="button" className="btn btn-primary btn-sm m-1">New Game</button>
                    </Link>
                    <button className="btn btn-primary btn-sm m-1" onClick={useLogout}>Logout</button>
                    </>
                    }
                    <Link to="/stats">  
                    <button type="button" className="btn btn-primary btn-sm m-1">Stats</button>
                    </Link>
                </ul>
            </div>
        </nav>
  );
}


