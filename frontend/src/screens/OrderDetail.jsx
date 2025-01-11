import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, ListGroupItem, Image, Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import {
      useOrderDetailsQuery,
      useOrderPayMutation,
      useGetPayPalClientIdQuery,
      useGetDeliveredAdminOrdersMutation
     } from "../slices/orderApiSlice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const OrderDetail = () => {

    const { id: orderId } = useParams()
    const { data: order, refetch, isLoading, error } = useOrderDetailsQuery(orderId)

    const [orderPay, { isLoading: loadingPay }] = useOrderPayMutation()

    const [deliveredOrder, { isLoading: loadingDeliver }] = useGetDeliveredAdminOrdersMutation()

    const { user } = useSelector((state) => state.auth)

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

    const {data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery()

    useEffect(() => {

        if(!errorPayPal && !loadingPayPal && paypal.clientId) {

            const loadPayPalScript = async () => {

                paypalDispatch({

                    type: 'resetOptions',
                    value: {

                        'clientId': paypal.clientId,
                        currency: 'USD'
                    }
                })

                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }

            if(order && !order.isPaid) {

             if(!window.paypal) {

                loadPayPalScript()
             }

            }
        }
    }, [order, paypal, paypalDispatch, errorPayPal, loadingPayPal])


    const deliveredAdminOrderHandler = async () => {

        try {

            await deliveredOrder(orderId)
            refetch()
            toast.success('Order delivered successfully')
            
        } catch (err) {

            toast.error(err?.data?.message || err.message)
            
        }
    }

   async function onApproveTest() {

    await orderPay({orderId, details: { payer: {} }})
   }


    function createOrder(data, actions) {

        return actions.order.create({

            purchase_units: [

                {
                    amount: {
                        value: order.totalPrice
                    }
                }
            ]
        }).then((orderId) => {

            return orderId
        })
    }


    function onApprove(data, actions) {

        return actions.order.capture().then(async function (details) {

            try {

                await orderPay({orderId, details})
                refetch()
                toast.success('Payment successful')
                
            } catch (error) {

                toast.error(error?.data?.message || error.message)
                
            }
        })
    }


    function onError(error) {

        toast.error(error.message)
    }


  return isLoading ? 
  
  (
  <Loader />

) : error ? (

<Message variant='danger' />

) : (

    <>
    <h1>Order {order._id}</h1>

    <Row>
    <Col md={8}>
    <ListGroup variant='flush'>
    <ListGroupItem>
    <h2>Shipping Address</h2>
    <p>
    <strong>Name: </strong> {order.user.name}
    </p>

    <p>
    <strong>Email: </strong> {order.user.email}
    </p>

    <p>
    <strong>Address: </strong>
    { order.shippingAddress.address }, { order.shippingAddress.city }, { order.shippingAddress.country } {' '}
    { order.shippingAddress.state }, { order.shippingAddress.zipCode } {' '}
    { order.shippingAddress.phone }
    </p>
    {order.isDelivered ? (

       <Message variant='success'>
        Delivered on {order.deliveredAt}
       </Message> 
    ) : (

        <Message variant='danger'>Not Delivered</Message>
    )}
    </ListGroupItem>

    <ListGroupItem>
    <h2>Payment Method</h2>
    <p>
    <strong>Method: </strong>
    {order.paymentMethod}
    </p>

    {order.isPaid ? (

        <Message variant='success'>
        Paid on {order.paidAt}
        </Message>
    ) : (

        <Message variant='danger'>Not Paid</Message>
    )}
    </ListGroupItem>

    <ListGroupItem>
    <h2>Order Items</h2>

    {order.orderItems.map((item, index) => (

        <ListGroupItem key={index}>
        <Row>
        <Col md={1}>
        <Image src={item.image} alt={item.name} fluid rounded />
        </Col>

        <Col>
        <Link to={`/product/{item.product}`}>
        {item.name}
        </Link>
        </Col>

        <Col md={4}>
        {item.qty} x ${item.price} = ${ item.qty * item.price }
        </Col>
        </Row>
        </ListGroupItem>
    ))}
    </ListGroupItem>
    </ListGroup>
    </Col>
    <Col md={4}>
    <Card>
    <ListGroup variant='flush'>
    <ListGroupItem>
    <h2>Order Summary</h2>
    </ListGroupItem>

    <ListGroupItem>

    <Row>
    <Col>Items:</Col>
    <Col>${order.itemsPrice}</Col>
    </Row>

    <Row>
    <Col>Shipping:</Col>
    <Col>${order.shippingPrice}</Col>
    </Row>

    <Row>
    <Col>Tax:</Col>
    <Col>${order.taxPrice}</Col>
    </Row>

    <Row>
    <Col>Total:</Col>
    <Col>${order.totalPrice}</Col>
    </Row>

    </ListGroupItem> 
    {/* PAY ORDER */} 
    {!order.isPaid &&  (

    <ListGroupItem>
    { loadingPay && <Loader /> }

    {isPending ? <Loader /> : (

    <div>
    {/*<Button onClick={ onApproveTest } style={{marginBottom: '10px'}}>Test Pay Order</Button> */}

    <div>
    <PayPalButtons 
    createOrder={ createOrder }
    onApprove={ onApprove }
    onError={ onError }
     ></PayPalButtons>
    </div>
     </div>
    )}
    </ListGroupItem> 
    )}
    {/* DELIVERED ADMIN ORDER */} 
    { loadingDeliver && <Loader /> }

    {user && user.isAdmin && order.isPaid && !order.isDelivered && (

       <ListGroupItem>
        <Button type='button' className='btn btn-block' onClick={ deliveredAdminOrderHandler }>Mark As Delivered</Button>
       </ListGroupItem>
    )}
    </ListGroup>
    </Card>

    </Col>
    </Row>
    </>
)

  
}
export default OrderDetail