// import NavButton from "./navBarButton"

export default function Navbar() {
    return (
        <header>
            <nav>
                <Nav content='Home'destination='/'></Nav>
                <Nav content='Signin'destination='/signin'></Nav>
                <Nav content='Signup'destination='/signup'></Nav>
                <Nav content='Profile'destination='/profile'></Nav>
                <Nav content='Stats'destination='/stats'></Nav>
                <Nav content='StatsAll'destination='/statsall'></Nav>
            </nav>
        </header>
  );
}


