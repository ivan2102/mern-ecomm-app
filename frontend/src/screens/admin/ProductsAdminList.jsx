import { useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { toast } from 'react-toastify';
import { useGetProductsQuery, useCreateAdminProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice';


const ProductsAdminList = () => {

    const { pageNumber } = useParams()

    const {data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber })
    const [ createAdminProduct , { isLoading: loadingCreate } ] = useCreateAdminProductMutation()
    const [ deleteProduct, { isLoading: loadingDelete } ] = useDeleteProductMutation()

    const createAdminProductHandler = async () => {

        if (window.confirm('Are you sure you want to create a new product?')) {

            try {

                await createAdminProduct()
                refetch()
                
            } catch (err) {

                toast.error(err?.data?.message || err.error)
                
            }
        }
    }

    const deleteProductHandler = async (id) => {

    if (window.confirm('Are you sure you want to delete this product?'))

       try {

        await deleteProduct(id)
        toast.success('Product deleted successfully')
        refetch()
        
       } catch (err) {

        toast.error(err?.data?.message || err.error)
        
       }
        
    }
  return <>
    <Row className='align-items-center'>
     <Col>
     <h1>Your Products</h1>
     </Col>

     <Col className='text-end'>
     <Button className='btn-sm m-3' onClick={ createAdminProductHandler }>
       <FaPlus /> Create Product
     </Button>
     </Col>   
    </Row>

    { loadingCreate && <Loader /> }
    { loadingDelete && <Loader /> }

    {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Edit / Delete</th>
                </tr>
            </thead>

            <tbody>
                {data.products.map((product) => (

                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>
                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                            <Button variant='info' className='btn-sm mx-2 text-white'>
                            <FaEdit />
                            </Button>
                            </LinkContainer>

                            <Button 
                            variant='danger' 
                            className='btn-sm mx-2 text-white'
                            onClick={() => deleteProductHandler(product._id)}
                            >
                                <FaTrash />
                            </Button>
                        </td>
                     
                    </tr>
                ))}
            </tbody>
        </Table>

        <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
    )}
    </>
  
}
export default ProductsAdminList