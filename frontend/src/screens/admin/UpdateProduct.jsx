import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useUpdateAdminProductMutation, useGetProductDetailsQuery, useUploadImageMutation } from "../../slices/productApiSlice";
const UpdateProduct = () => {

    const { id: productId } = useParams()
    const navigate = useNavigate()

    const [ name, setName ] = useState('')
    const [price, setPrice ] = useState('')
    const [ brand, setBrand ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ countInStock, setCountInStock ] = useState('')
    const [ image, setImage ] = useState('')

    const { data: product, isLoading, refetch, error} = useGetProductDetailsQuery(productId)
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateAdminProductMutation()
    const [ uploadImage, { isLoading: loadingUpload } ] = useUploadImageMutation()

    useEffect(() => {

        if (product) {
        setName(product.name)
        setPrice(product.price)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setCountInStock(product.countInStock)
        setImage(product.image)

        }
    }, [product])

    const submitHandler = async (event) => {
        event.preventDefault()

        const updatedProduct = {

            _id: productId,
            name,
            price,
            brand,
            category,
            description,
            countInStock,
            image
        }

        const result = await updateProduct(updatedProduct)

        if (result.error) {

            toast.error(result.error)

        } else {

            toast.success('Product updated successfully')
            navigate('/admin/productlist')
        }
    }

    const uploadImageHandler = async (event) => {

        const formData = new FormData()
        formData.append('image', event.target.files[0])

        try {

            const res = await uploadImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
            
        } catch (err) {

            toast.error(err?.data?.message || err.error)
            
        }
    }
  return <>
  <Link to='/admin/productlist' className="btn btn-outline-secondary my-3">
  Home
  </Link>
    <FormContainer>
    <h1>Update Product</h1>
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

    <FormGroup controlId="price" className="my-2">
    <FormLabel>Price</FormLabel>
   <FormControl 
   type='number'
    value={price} 
    placeholder="Type your price here..."
     onChange={(event) => setPrice(event.target.value)}>

    </FormControl>
    </FormGroup>

    <FormGroup controlId="brand" className="my-2">
    <FormLabel>Brand</FormLabel>
   <FormControl 
   type='text'
    value={brand} 
    placeholder="Type your brand here..."
     onChange={(event) => setBrand(event.target.value)}>

    </FormControl>
    </FormGroup>

    <FormGroup controlId="category" className="my-2">
    <FormLabel>Category</FormLabel>
   <FormControl 
   type='text'
    value={category} 
    placeholder="Type your category here..."
     onChange={(event) => setCategory(event.target.value)}>

    </FormControl>
    </FormGroup>

    <FormGroup controlId="description" className="my-2">
    <FormLabel>Description</FormLabel>
   <FormControl 
   type='text'
    value={description} 
    placeholder="Type your description here..."
     onChange={(event) => setDescription(event.target.value)}>

    </FormControl>
    </FormGroup>

    <FormGroup controlId="countInStock" className="my-2">
    <FormLabel>Count In Stock</FormLabel>
   <FormControl 
   type='number'
    value={countInStock} 
    placeholder="Type your description here..."
     onChange={(event) => setCountInStock(event.target.value)}>

    </FormControl>
    </FormGroup>

<FormGroup controlId="image" className="my-2">
    <FormLabel>Image</FormLabel>
   <FormControl 
   type='text'
    value={image} 
    placeholder="Type image url..."
     onChange={(event) => setImage(event.target.value)}>

    </FormControl>

    <FormControl type="file" label="Choose file" onChange={ uploadImageHandler }></FormControl>
    </FormGroup>

    {loadingUpload && <Loader />}
    
    <Button type="submit" variant="primary" className='my-2'>Update Product</Button>
    </Form>
   )}
  
   
    </FormContainer>
  </>
}
export default UpdateProduct