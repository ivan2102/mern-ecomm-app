import { Navbar, Nav, Container, NavbarToggle, NavbarCollapse, NavLink } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import  { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <header>
        <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>

        <LinkContainer to='/'>
        <Navbar.Brand>
        <img width="40px;" src={ logo } alt="logo" />
        E-Commerce Store
        </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ms-auto'>

       <LinkContainer to='/cart'>
       <Nav.Link>
       <FaShoppingCart /> Cart
       </Nav.Link>
       </LinkContainer>

       <LinkContainer to='/login'>
       <Nav.Link>
       <FaUser /> Login
       </Nav.Link>
       </LinkContainer>
       
        </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}
export default Header