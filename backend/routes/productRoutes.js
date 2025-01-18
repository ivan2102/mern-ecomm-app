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
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getProducts)
router.route('/top').get(getTopRatedProducts)
router.route('/:id').get(checkObjectId, getSingleProduct).put(protect, adminMiddleware, checkObjectId, updateAdminProduct).delete(protect, adminMiddleware, checkObjectId, deleteProduct)
router.route('/').post(protect, adminMiddleware, createAdminProduct)
router.route('/:id/reviews').post(protect, checkObjectId, productReviews)

export default router;