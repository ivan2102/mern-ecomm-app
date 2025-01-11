import express from 'express';
const router = express.Router();
import {
    createOrders,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateAdminOrderToDelivered,
    getAdminOrders

} from '../controllers/orderController.js';
import { protect, adminMiddleware } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createOrders).get(protect, adminMiddleware, getAdminOrders);
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, adminMiddleware, updateAdminOrderToDelivered)

export default router;
