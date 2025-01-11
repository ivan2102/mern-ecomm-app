import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingAddress = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [ address, setAddress ] = useState(shippingAddress?.address || '')
    const [ city, setCity ] = useState(shippingAddress?.city || '')
    const [ zipCode, setZipCode ] = useState(shippingAddress?.zipCode || '')
    const [ country, setCountry ] = useState(shippingAddress?.country || '')
    const [ state, setState ] = useState(shippingAddress?.state || '')
    const [ phone, setPhone ] = useState(shippingAddress?.phone || '')

        const submitHandler = (event) => {
        event.preventDefault()
        dispatch(saveShippingAddress({address, city, zipCode, country, state, phone}))
        navigate('/payment')
    }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping Address</h1> 

      <Form onSubmit={ submitHandler }>
        <FormGroup controlId='address' className="my-2">
        <FormLabel>Your Address</FormLabel>
        <FormControl 
        type='text'
        value={address}
        placeholder="Type your address here"
        onChange={(event) => setAddress(event.target.value)}
        >
        </FormControl>
        </FormGroup>

        <FormGroup controlId="city" className="my-2">
        <FormLabel>Your City</FormLabel>
        <FormControl
        type='text'
        value={city}
        placeholder="Type your city here"
        onChange={(event) => setCity(event.target.value )}
        >
        </FormControl>
       </FormGroup>

       <FormGroup controlId="country" className="my-2">
        <FormLabel>Your Country</FormLabel>
        <FormControl
        type='text'
        value={country}
        placeholder="Type your country here"
        onChange={(event) => setCountry(event.target.value)}
        >
        </FormControl>
       </FormGroup>

       <FormGroup controlId="state" className="my-2">
        <FormLabel>Your State</FormLabel>
        <FormControl
        type='text'
        value={state}
        placeholder="Type your state here"
        onChange={(event) => setState(event.target.value)}
        >
        </FormControl>
       </FormGroup>

       <FormGroup controlId="zipCode" className="my-2">
        <FormLabel>Your ZipCode</FormLabel>
        <FormControl
        type='text'
        value={zipCode}
        placeholder="Type your zip Code here"
        onChange={(event) => setZipCode(event.target.value)}
        >
        </FormControl>
       </FormGroup>

       <FormGroup controlId="phone" className="my-2">
        <FormLabel>Your Phone</FormLabel>
        <FormControl
        type='text'
        value={phone}
        placeholder="Type your phone here"
        onChange={(event) => setPhone(event.target.value)}
        >
        </FormControl>
       </FormGroup>

       <Button type='submit' variant='primary' className="my-2">Continue</Button>
       
      </Form>

      
        
    </FormContainer>
  )
}
export default ShippingAddress