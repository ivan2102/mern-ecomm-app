import { useState, useEffect } from "react";
import { Form, Button, Col, FormGroup, FormLabel, FormCheck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";
    const Payment = () => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

        const dispatch = useDispatch()
        const navigate = useNavigate()

        const cart = useSelector((state) => state.cart)
        const { shippingAddress } = cart

        useEffect(() => {

            if (!shippingAddress) {
                navigate('/shipping')
            }
        }, [shippingAddress, navigate])

        const submitHandler = (event) => {
            event.preventDefault()

            dispatch(savePaymentMethod(paymentMethod))
            navigate('/placeorder')
        }

    return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={ submitHandler }>
            <FormGroup>
            <FormLabel as='legend'>Select Method</FormLabel>
            <Col>
            <FormCheck
            type='radio'
            className='my-2'
            label='PayPal or Credit Card'
            id='PayPal'
            name="paymentMethod"
            value='PayPal'
            checked
            onChange={(event) => setPaymentMethod(event.target.value)}
            >
           </FormCheck>
            </Col>
            </FormGroup>

            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
        
    </FormContainer>
  )
}
export default Payment