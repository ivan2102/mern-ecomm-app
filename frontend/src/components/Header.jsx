import { Navbar, Nav, Container, Badge, NavbarToggle, NavbarCollapse, NavLink, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import  { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)

  const [ logoutSlice ] = useLogoutMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    
    try {

      await logoutSlice().unwrap()
      dispatch(logout())
      dispatch(resetCart())
      navigate('/login')
      
    } catch (error) {

      console.log(error);
      
      
    }
    
  }
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

        <SearchBox />
        
       <LinkContainer to='/cart'>
       <NavLink>
       <FaShoppingCart />
       {cartItems.length > 0 && (

         <Badge pill bg='warning' style={{marginRight: '3px'}}>
          {cartItems.reduce((acc, cur) => acc + cur.qty, 0)}
         </Badge>
       )}
       </NavLink>
       </LinkContainer>

       { user ? (

      <NavDropdown title={ user.name } id='username'>
      <LinkContainer to='/profile'>
      <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>

      <NavDropdown.Item onClick={ logoutHandler }>
      Logout
      </NavDropdown.Item>

      </NavDropdown>

      ) : ( 

      <LinkContainer to='/login'>
      <NavLink href='/login'>
      <FaUser /> Login
      </NavLink>
      </LinkContainer>
    )}

    {user && user.isAdmin && (

      <NavDropdown title='Admin' id='admin'>
        <LinkContainer to='/admin/userlist'>
        <NavDropdown.Item>Admin Users</NavDropdown.Item>
        </LinkContainer>

        <LinkContainer to='/admin/productlist'>
        <NavDropdown.Item>Admin Products</NavDropdown.Item>
        </LinkContainer>

        <LinkContainer to='/admin/orderlist'>
        <NavDropdown.Item>Admin Orders</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    )}  
       
        </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}
export default Header