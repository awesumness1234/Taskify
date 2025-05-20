import express from 'express';
import AuthController from '../controller/AuthController.js';


const router = express.Router();
router.post('/register', AuthController.registerUser);
router.post('/login',AuthController.loginUser)
export default router;