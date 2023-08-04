import express from 'express';
import auth from '../middleware/auth';
import userCtrl from '../controller/userCtrl';
import paymentCtrl from '../controller/paymentCtrl';
import { validRegister } from '../middleware/valid';
//import { sendMessage } from '../config/sendSMS';


const router = express.Router();

router.patch('/user', auth, userCtrl.updateUser);

router.patch('/reset-password', auth, userCtrl.resetPassword);
router.patch('/user/:id', userCtrl.getUser)
router.get('/users', userCtrl.getAllUsers)

//payment routes

router.post('/payment-details', paymentCtrl.register );
router.get('/payment-users', paymentCtrl.getAllPayers)



export default router;
