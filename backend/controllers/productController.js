import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// Fetch all products
const getProducts = asyncHandler(async (req, res) => {

    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {name: { $regex: req.query.keyword, $options: 'i' }} : {}
    const count = await Product.countDocuments({ ...keyword })

    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    res.json({products, page, pages: Math.ceil(count / pageSize) });
})

// Fetch Single Product
const getSingleProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if(product) {

        return res.json(product)

    }else {

        res.status(404)
        throw new Error('Product not found')
    }
})

// Create Admin Product
const createAdminProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpeg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

const updateAdminProduct = asyncHandler(async (req, res) => {

    const {name, price, brand, category, description, image, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {

        product.name = name,
        product.price = price,
        product.brand = brand,
        product.category = category,
        product.description = description,
        product.image = image,
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(200).json(updatedProduct)

    } else {

        res.status(404)
        throw new Error('Product not found')
    }

    
})

const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id)

    if (product) {
    await Product.deleteOne({ _id: product._id })
    res.status(200).json({ message: 'Product deleted successfully' })

    } else {

        res.status(404)
        throw new Error('Product not found')
    }
})

const productReviews = asyncHandler (async (req, res) => {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id)

    if (product) {

     const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString()) 

     if (alreadyReviewed) {

        res.status(400)
        throw new Error('Product already reviewed')

     }

     const review = {

        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
     }

     product.reviews.push(review)

     product.numReviews = product.reviews.length

     product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length

     await product.save()
     res.status(201).json({message: 'Review added successfully'})

    } else {

        res.status(404)
        throw new Error('Product not found')
    }
})

const getTopRatedProducts = asyncHandler(async (req, res) => {

   const products = await Product.find({}).sort({ rating: -1 }).limit(3)

   res.status(200).json(products)
})

export {
       getProducts,
       getSingleProduct,
       createAdminProduct,
       updateAdminProduct,
       deleteProduct,
       productReviews,
       getTopRatedProducts
     }