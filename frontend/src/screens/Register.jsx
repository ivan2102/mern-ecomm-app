import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useRegisterMutation } from "../slices/usersSlice";
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';


const Login = () => {
  
  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, {isLoading}] = useRegisterMutation()
  const user = useSelector((state) => state.auth)

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

    

    useEffect(() => {

      if(user) {

        navigate(redirect)
      }
    }, [user, redirect, navigate])

    const submitHandler = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {

            toast.error('Passwords do not match')
            return

        } else {

        try {

            const res = await register({name, email, password}).unwrap()
            dispatch(setCredentials({ ...res }))
            navigate(redirect)
      
        } catch (err) {
      
            toast.error(err?.data?.message || err.error)
            }
        } 
       
     }

  return (
    <FormContainer>
        <h1>Register</h1>

        <Form onSubmit={ submitHandler }>

        <FormGroup controlId="name"className="my-3">
        <FormLabel>Your Name</FormLabel>
        <FormControl 
        type='text'
        placeholder="Please enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        >
       </FormControl>
        </FormGroup>

        <FormGroup controlId="email" className="my-3">
        <FormLabel>Email Address</FormLabel>
        <FormControl 
        type="email" 
        placeholder="Please enter your Email address"
        value={ email }
        onChange={(event) => setEmail(event.target.value)}>
        </FormControl>
        </FormGroup>

        <FormGroup controlId="password" className="my-3">
        <FormLabel>Password</FormLabel>
        <FormControl
        type="'password"
        placeholder="Please enter your password"
        value={ password }
        onChange={(event) => setPassword(event.target.value)}
        >
       </FormControl>
        </FormGroup>

        <FormGroup controlId="confirmPassword" className="my-3">
        <FormLabel>Confirm Password</FormLabel>
        <FormControl
        type='password'
        placeholder="Please confirm your password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        >
        </FormControl>
        </FormGroup>

        <Button type="submit" variant="secondary" disabled={ isLoading } className="mt-2">
        Register
        </Button>

        { isLoading && <Loader /> }
        </Form>

        <Row className='py-3'>
            <Col>
            Already have an account? Please <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}
export default Login