import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";



const ProductDetails = () => {

    const [product, setProduct] = useState([])

    const { id: productId } = useParams()

    useEffect(() => {
      
     const fetchProduct = async () => {

        const { data } = await axios.get(`/api/products/${productId}`)
        setProduct(data)
     }
    
      fetchProduct()
    }, [productId])
    

  return (
    <>
    <Link className="btn btn-light my-3" to='/'>Go Back</Link>

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

            <ListGroup.Item>
              <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                Add To Cart
                </Button>  
            </ListGroup.Item>
        </ListGroup>  
        </Card>
        </Col>

    </Row>
    </>
  )
}
export default ProductDetails