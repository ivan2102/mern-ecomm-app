import express from 'express';
const router = express.Router();
import { getProducts,
     getSingleProduct, 
     createAdminProduct,
      updateAdminProduct, 
      productReviews,
      deleteProduct,
      getTopRatedProducts
 } from '../controllers/productController.js';
import { protect, adminMiddleware } from '../middleware/authMiddleware.js';

router.route('/').get(getProducts)
router.route('/top').get(getTopRatedProducts)
router.route('/:id').get(getSingleProduct).put(protect, adminMiddleware, updateAdminProduct).delete(protect, adminMiddleware, deleteProduct)
router.route('/').post(protect, adminMiddleware, createAdminProduct)
router.route('/:id/reviews').post(protect, productReviews)

export default router;