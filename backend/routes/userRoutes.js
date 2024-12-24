import express from 'express';
const router = express.Router();
import {
    login,
    register,
    logout,
    userProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from '../controllers/userController.js';
import { protect, adminMiddleware } from '../middleware/authMiddleware.js';

router.route('/').post(register).get(protect, adminMiddleware, getUsers)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/profile').get(protect, userProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, adminMiddleware, deleteUser).get(protect, adminMiddleware, getUserById).put(protect, adminMiddleware, updateUser)

export default router;
