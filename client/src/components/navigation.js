import React, { useState } from 'react';
import Home from '../pages/Home';
import Profile from '../pages/Profile'
import Signin from '../pages/Signin'
import Signup from '../pages/Signup'
import Stats from '../pages/Stats'
import Statsall from '../pages/Statsall'
import Footer from './Footer'
import Navbar from './navBar';

export default function Navigation() {
    const [currentPage, setCurrentPage] = useState('Home');

    const renderPage = () => {
        if (currentPage === 'Home') {
            return <Home />
        }
        if (currentPage === 'Profile') {
            return <Profile />
        }
        if (currentPage === 'Signin')
            return <Signin />
        if (currentPage === 'Signup')
            return <Signup />
        if (currentPage === 'Stats')
            return <Stats />
        if (currentPage === 'Statsall')
            return <Statsall />

    }

    const changePage = (page) => setCurrentPage(page);

    return (
        <div id='root-div'>
            <Navbar currentPage={currentPage} changePage={changePage} />
                {renderPage()}
            <Footer />
        </div>
    )
}