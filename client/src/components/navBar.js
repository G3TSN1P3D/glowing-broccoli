import React from 'react'


export default function Navbar({ currentPage, changePage }) {
    return (
        <nav>
            <ul>
                <li onClick={() => changePage('Home')}>Home</li>
                <li onClick={() => changePage('Signin')}>Signin</li>
                <li onClick={() => changePage('Signup')}>Signup</li>
                <li onClick={() => changePage('Profile')}>Profile</li>
                <li onClick={() => changePage('Stats')}> Player Stats</li>
                <li onClick={() => changePage('Statsall')}>All Player Stats</li>
            </ul>
        </nav>
  );
}


