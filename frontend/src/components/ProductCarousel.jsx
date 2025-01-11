import { Link } from 'react-router-dom';
import { Carousel, CarouselCaption, CarouselItem, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { useGetTopRatedProductsQuery } from '../slices/productApiSlice';

const ProductCarousel = () => {

    const { data: products, isLoading, error } = useGetTopRatedProductsQuery()

  return isLoading ? <Loader /> : error ? <Message variant='danger'>{ error }</Message> 
  
  : 

  (
    <Carousel pause='hover' className='mb-4' style={{ backgroundColor: '#EFF3EA' }}>
    {products.map(product => (

    <CarouselItem key={product._id}>
    <Link to={`/product/${product._id}`}>

    <Image src={ product.image } alt={ product.name } className='carousel-image' fluid />

    <CarouselCaption className='carousel-caption'>
    <h2>{ product.name } (${ product.price })</h2>
    </CarouselCaption>
    </Link>
    </CarouselItem>
    ))}
    </Carousel>
  )
  
}
export default ProductCarousel