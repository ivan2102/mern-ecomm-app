import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { redirect } from "react-router-dom"

const Login = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [login, {isLoading}] = useLoginMutation()
  const { user } = useSelector((state) => state.auth)

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

    

    useEffect(() => {

      if(user) {

        navigate(redirect)
      }
    }, [navigate, redirect,  user])

    const submitHandler = async (event) => {
        event.preventDefault()
        try {

          const res = await login({email, password}).unwrap()
          dispatch(setCredentials({ ...res }))
          navigate(redirect)

        } catch (err) {

          toast.error(err?.data?.message || err.error)
        }
        
    }
  return (
    <FormContainer>
        <h1>Login</h1>

        <Form onSubmit={ submitHandler }>
        <FormGroup controlId="email" className="my-3">
        <FormLabel>Email Address</FormLabel>
        <FormControl 
        type="email" 
        placeholder="Enter your Email address"
        value={ email }
        onChange={(event) => setEmail(event.target.value)}>

        </FormControl>
        </FormGroup>

        <FormGroup controlId="password" className="my-3">
        <FormLabel>Password</FormLabel>
        <FormControl
        type="password"
        placeholder="Enter your password"
        value={ password }
        onChange={(event) => setPassword(event.target.value)}
        >

        </FormControl>
        </FormGroup>

        <Button type="submit" variant="secondary" disabled={ isLoading } className="mt-2 text-white">
        Login
        </Button>

        { isLoading && <Loader /> }
        </Form>

        <Row className='py-3'>
            <Col>
            Don't have an account yet? Please <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}
export default Login