import express from 'express';
import { registerController } from '../controllers/authController.js';
import { loginController } from '../controllers/authController.js';
import { testcontroller } from '../controllers/authController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
import { forgotPasswordController } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', registerController); 
router.post('/login', loginController);
router.post('forgot-password',forgotPasswordController);
router.get('/test',requireSignIn,isAdmin,testcontroller)
///protected route


router.get('/user-auth',requireSignIn,(req,res)=>{
  res.send(200).sendstatus({ok:true})
})
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
  res.send(200).send({ok:true})
})
export default router;
