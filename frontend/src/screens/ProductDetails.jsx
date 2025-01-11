import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery, useProductReviewMutation } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { toast } from 'react-toastify';
import { addToCart } from "../slices/cartSlice";

const ProductDetails = () => {

const { id: productId } = useParams()

const dispatch = useDispatch()
const navigate = useNavigate()

const { user } = useSelector((state) => state.auth)

const [ qty, setQty ] = useState(1)
const [ rating, setRating ] = useState(0)
const [ comment, setComment ] = useState('')

const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId)
const [createReview, { isLoading: loadingReview }] = useProductReviewMutation()

const addToCartHandler = () => {

    dispatch(addToCart({...product, qty }))
    navigate('/cart')
}


const submitHandler = async (event) => {
    event.preventDefault()

    try {

        await createReview({productId, rating, comment }).unwrap()
        refetch()
        toast.success('Review submitted successfully')
        setRating(0)
        setComment('')
        
    } catch (err) {

        toast.error(err?.data?.message || err.error)
        
    }
}

    return (
    <>
    <Link className="btn btn-light my-3" to='/'>Go Back</Link>

    { isLoading ? <Loader /> : error ? (<Message variant='danger'>{error?.data?.message || error.error }</Message>) : (

  <>
  <Meta title={ product.name } />
<Row>

<Col md={5}>
<Image src={ product.image } alt={product.name} fluid />
</Col>

<Col md={4}>
<ListGroup variant="flush">

<ListGroup.Item>
    <h3>{ product.name }</h3>
</ListGroup.Item>

 <ListGroup.Item>
    <strong>Price: </strong> ${product.price}
</ListGroup.Item>

<ListGroup.Item>
    <Rating value={ product.rating } text={`${product.numReviews} reviews`} />
</ListGroup.Item>

<ListGroup.Item>
    <strong>Description:</strong> { product.description }
</ListGroup.Item>

</ListGroup>

</Col>

<Col md={3}>
<Card>
  <ListGroup variant="flush">
   <ListGroup.Item>
    <Row>
        <Col><strong>Price:</strong> </Col>

        <Col>
        <strong>${ product.price }</strong>
        </Col>
    </Row>
    </ListGroup.Item> 

    <ListGroup.Item>
        <Row>
            <Col><strong>Status:</strong> </Col>

            <Col>
            <strong>{ product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }</strong>
            </Col>
        </Row>
    </ListGroup.Item>

    {product.countInStock > 0 && (

        <ListGroup.Item>
            <Row>
            <Col>Qty</Col> 

            <Col>
            <Form.Control 
            as='select' 
            value={qty}
            onChange={(event) => setQty(Number(event.target.value))}
            >
            {[...Array(product.countInStock).keys()].map((x) => (

                <option key={ x + 1 } value={ x + 1 }>
                    { x + 1 }
                </option>
            ))}
            </Form.Control>
            </Col>   
            </Row>
        </ListGroup.Item>
    )}

    <ListGroup.Item>
      <Button 
      className="btn-block"
       type="button"
        disabled={product.countInStock === 0}
        onClick={ addToCartHandler }
        >
        Add To Cart
        </Button>  
    </ListGroup.Item>
  </ListGroup>  
   </Card>
  </Col>

  </Row>

  <Row className="review">
    <Col md={6}>
    <h2>Product Reviews</h2>
    {product.reviews.length === 0 && <Message>No Reviews</Message>}
    <ListGroup variant="flush">
    {product.reviews.map(review => (

    <ListGroupItem key={review._id}>
     <strong>{ review.name }</strong>
     <Rating value={ review.rating } />
     <p>{ review.createdAt.substring(0, 10) }</p>
     <p>{ review.comment }</p>
    </ListGroupItem>
    ))}

    <ListGroupItem>
     <h2>Leave your  review here</h2>
     {loadingReview && <Loader />}  

     {user ? (

        <Form onSubmit={submitHandler }>
        <FormGroup controlId="rating" className="my-2">
        <FormLabel>Rating</FormLabel>
        <FormControl 
        as='select'
        value={rating}
        onChange={(event) => setRating(Number(event.target.value))}>
        <option value="">Select...</option>
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
        </FormControl>
        </FormGroup>

        <FormGroup controlId="comment" className="my-2">
        <FormLabel>Leave your comment here</FormLabel>
        <FormControl 
        as='textarea'
        row='3'
        value={ comment }
        onChange={(event) => setComment(event.target.value)}>

        </FormControl>
        </FormGroup>

        <Button type='submit' disabled={loadingReview} variant='primary'>Submit</Button>
        </Form>
     ) : (

        <Message>
            Please <Link to='/login'>Login</Link> to write a review {' '}
        </Message>
     )} 
    </ListGroupItem>
    </ListGroup>
    </Col>
  </Row>
  </>
    ) }

    
    </>
  )
}
export default ProductDetails