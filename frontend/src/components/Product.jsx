import { Card, CardImg, CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating'; 

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded card'>
        <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top'className='img'/>
        </Link>

        <Card.Body>
            <Link to={`/product/{product._id}`} style={{ textDecoration: 'none' }}>
            <Card.Title as='div' className='product-title'>
            <strong>{ product.name }</strong>
            </Card.Title> 
            </Link>

            <Card.Text as='h3'>${ product.price }</Card.Text>

            <Card.Text as='div'>
              <Rating value={ product.rating } text={`${product.numReviews} reviews`} />
            </Card.Text>

        </Card.Body>
    </Card>
  )
}
export default Product