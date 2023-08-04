import express from 'express';
import authCtrl from '../controller/authController';
import { validRegister } from '../middleware/valid';

const router = express.Router();

router.post('/register', validRegister, authCtrl.register);
router.post('/active', authCtrl.activeAccount);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);
router.get('/refresh_token', authCtrl.refreshToken);
router.post('/login_sms', authCtrl.loginSMS)
router.post('/google_login', authCtrl.googleLogin)

router.post('/login_sms', authCtrl.loginSMS)

router.post('/sms_verify', authCtrl.smsVerify)

router.post('/forgot_password', authCtrl.forgotPassword)


// router.post('/admin-register', authCtrl.adminRegister);

export default router;
