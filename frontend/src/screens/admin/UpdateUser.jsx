import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, FormGroup, FormControl, FormLabel, FormCheck  } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {useUserDetailsQuery, useUpdateUserMutation, } from "../../slices/usersApiSlice";
const UpdateUser = () => {

    const { id: userId } = useParams()
    const navigate = useNavigate()

    const [ name, setName ] = useState('')
    const [email, setEmail ] = useState('')
    const [ isAdmin, setIsAdmin ] = useState(false)
    

    const { data: user, isLoading, refetch, error} = useUserDetailsQuery(userId)
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()
    

    useEffect(() => {

        if (user) {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        

        }
    }, [user])

    const submitHandler = async (event) => {
        event.preventDefault()

        try {

            await updateUser({ _id: userId, name, email, isAdmin })
            toast.success('User updated successfully')
            refetch()
            navigate('/admin/userlist')
            
        } catch (err) {

            toast.error(err?.data?.message || err.error)
            
        }
    }

  
  return <>
  <Link to='/admin/userlist' className="btn btn-outline-secondary my-3">
  Users
  </Link>
    <FormContainer>
    <h1>Update User</h1>
   {loadingUpdate && <Loader />}

   {isLoading ? <Loader /> : error ? 
   <Message variant='danger'>{error}</Message> : (

    <Form onSubmit={ submitHandler }>
    <FormGroup controlId="name" className="my-2">
    <FormLabel>Your Name</FormLabel>
   <FormControl 
   type='text'
    value={name} 
    placeholder="Type your name here..."
     onChange={(event) => setName(event.target.value)}>

    </FormControl>
    </FormGroup>

    <FormGroup controlId="email" className="my-2">
    <FormLabel>Your Email</FormLabel>
   <FormControl 
   type='email'
    value={email} 
    placeholder="Type your price here..."
     onChange={(event) => setEmail(event.target.value)}>

    </FormControl>
    </FormGroup>

    <FormGroup controlId='isAdmin' className='my-2'>
     <FormCheck 
     type='checkbox'
     label='Is Admin'
     checked={isAdmin}
     onChange={(event) => setIsAdmin(event.target.checked)}
     ></FormCheck>  
    </FormGroup>

    
 <Button type="submit" variant="primary" className='my-2'>Update User</Button>
    </Form>
   )}
  
    </FormContainer>
  </>
}
export default UpdateUser