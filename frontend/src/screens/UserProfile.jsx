import { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, FormLabel, FormControl, FormGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from '../components/Loader';
import { useUserProfileMutation } from "../slices/usersApiSlice";
import { useGetAllOrdersQuery } from '../slices/orderApiSlice';
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { FaTimes } from 'react-icons/fa';

const UserProfile = () => {

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useUserProfileMutation()

    const { data: orders, isLoading, error } = useGetAllOrdersQuery()

    useEffect(() => {

        if (user) {
           
            setName(user.name)
            setEmail(user.email)
        }
    }, [user, user.name, user.email])

    const submitHandler = async (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {

            toast.error('Passwords do not match')

        } else {

            try {

                const res = await updateProfile({ _id: user._id, name, email, password }).unwrap()
                dispatch(setCredentials(res))
                toast.success('Profile updated successfully')
                
            } catch (err) {

                toast.error(err?.data?.message || err.error)
                
            }
        }
    }
  return (
    <Row>
    <Col md={3}>
    <h2>User Profile</h2>

    <Form onSubmit={ submitHandler }>
    <FormGroup controlId='name' className='my-2'>
    <FormLabel>Your Name</FormLabel>
    <FormControl
    type='text'
    value={name}
    placeholder='Please type your name here...'
    onChange={(event) => setName(event.target.value)}
    >
    </FormControl>
    </FormGroup>

    <FormGroup controlId='email' className='my-2'>
    <FormLabel>Your Email</FormLabel>
    <FormControl
    type='email'
    value={email}
    placeholder='Please type your email here...'
    onChange={(event) => setEmail(event.target.value)}
    >
    </FormControl>
    </FormGroup>

    <FormGroup controlId='password' className='my-2'>
    <FormLabel>Your Password</FormLabel>
    <FormControl
    type='password'
    value={password}
    placeholder='Please type your password here...'
    onChange={(event) => setPassword(event.target.value)}
    >
     </FormControl>
    </FormGroup>

    <FormGroup controlId="confirmPassword" className='my-2'>
    <FormLabel>Confirm Password</FormLabel>
    <FormControl
    type='password'
    value={confirmPassword}
    placeholder='Please confirm your password'
    onChange={(event) => setConfirmPassword(event.target.value)}
    >
   </FormControl>
    </FormGroup>

    <Button type='submit' variant="primary">Update</Button>
    { loadingUpdateProfile && <Loader /> }
    </Form>
    </Col>
    <Col md={9}>
    <h2>My Orders</h2>

    { isLoading ? <Loader /> : error ? (<Message variant='danger'>
    {error?.data?.message || error.error}
    </Message>) : (

       <Table striped bordered hover responsive className='table-sm'>
        <thead>
        <tr>
        <th>ID</th>
        <th>Paid</th>
        <th>Delivered</th>
        <th>Total</th>
        <th>Date</th>
        </tr>
        </thead>

        <tbody>
        {orders.map((order) => (

          <tr key={order._id}>
            <td>{order._id}</td>
            
            <td>
            {order.isPaid ? (order.paidAt.substring(0, 10)) : (<FaTimes style={{color: 'red'}} /> )}
            </td>
            <td>
            {order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<FaTimes style={{color: 'red'}} />)}
            </td>
            <td>{order.totalPrice}</td>
            <td>{order.createdAt.substring(0, 10)}</td>
            <td>
            <LinkContainer to={`/order/${order._id}`}>
            <Button className='btn-sm' variant='success'>Details</Button>
            </LinkContainer>
            </td>
          </tr>
        ))}
        </tbody>
       </Table> 
    )}
    </Col>
    </Row>
  )
}
export default UserProfile