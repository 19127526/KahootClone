import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image from '../../assets/image/logo.png'

function NavBar() {
    return (
            <Navbar bg="white">
                <Container>
                    <Navbar.Brand href="/home">
                        Kahoot
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="">News</Nav.Link>
                        <Nav.Link href="">Group</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/login">Login/Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
    );
}

export default NavBar;