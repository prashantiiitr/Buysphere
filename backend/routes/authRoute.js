import express from 'express';
import { registerController } from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { testcontroller } from '../controllers/authController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController); 
router.post('/login', loginController);
router.get('/test',requireSignIn,isAdmin,testcontroller)
export default router;
