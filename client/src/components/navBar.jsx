import NavButton from "./navBarButton"

export default function Navbar() {
    return (
        <header>
            <nav>
                <Nav content='Home'destination='/'></Nav>
                <Nav content='Signup/in'destination='/'></Nav>
                <Nav content='NewGame'destination='/'></Nav>
                <Nav content='Player'destination='/'></Nav>
                <Nav content='Profile'destination='/'></Nav>
            </nav>
        </header>
  );
}


